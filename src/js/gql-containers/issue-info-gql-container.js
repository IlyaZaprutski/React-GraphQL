import { graphql } from 'react-apollo';

import IssueInfo from 'components/issue-info/issue-info';
import { GetIssueInfo } from 'queries/issue-queries';

const parseReactions = reactionGroups =>
    reactionGroups.map(reactionInfo => ({
        reactionType: reactionInfo.content,
        isReacted: reactionInfo.viewerHasReacted,
        reactionCount: reactionInfo.users.totalCount,
        users: reactionInfo.users.edges.map(({ node: { id, login, avatarUrl } }) => ({
            id,
            login,
            avatarUrl,
        })),
    }));

const mapDataToProps = ({ data }) => {
    if (data.loading) {
        return {
            isLoading: true,
            id: data.variables.issueId,
            bodyHTML: '',
            title: '',
            isClosed: false,
            authorLogin: '',
            authorAvatarUrl: '',
            reactionGroups: [],
            comments: [],
        };
    }

    const comments = data.node.comments.edges.map(({ node }) => ({
        id: node.id,
        authorLogin: node.author.login,
        authorAvatarUrl: node.author.avatarUrl,
        bodyHTML: node.bodyHTML,
        reactionGroups: parseReactions(node.reactionGroups),
    }));

    return {
        isLoading: data.loading,
        id: data.node.id,
        title: data.node.title,
        bodyHTML: data.node.bodyHTML,
        isClosed: data.node.closed,
        authorLogin: data.node.author.login,
        authorAvatarUrl: data.node.author.avatarUrl,
        reactionGroups: parseReactions(data.node.reactionGroups),
        comments,
    };
};

const mapPropsToOptions = ({ match: { params } }) => ({
    variables: {
        issueId: params.issueId,
    },
});

export default graphql(GetIssueInfo, {
    props: mapDataToProps,
    options: mapPropsToOptions,
})(IssueInfo);
