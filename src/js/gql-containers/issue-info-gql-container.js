import { graphql } from 'react-apollo';

import IssueInfo from 'components/issue-info/issue-info';
import { GetIssueInfo } from 'queries/issue-queries';

const parseReactions = reactions =>
    reactions.map(({ node: reactionNode }) => ({
        reactionType: reactionNode.content,
        userLogin: reactionNode.user.login,
        userAvatarUrl: reactionNode.user.avatarUrl,
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
            reactions: [],
            comments: [],
        };
    }

    const comments = data.node.comments.edges.map(({ node }) => ({
        id: node.id,
        authorLogin: node.author.login,
        authorAvatarUrl: node.author.avatarUrl,
        bodyHTML: node.bodyHTML,
        reactions: parseReactions(node.reactions.edges),
    }));

    return {
        isLoading: data.loading,
        id: data.node.id,
        title: data.node.title,
        bodyHTML: data.node.bodyHTML,
        isClosed: data.node.closed,
        authorLogin: data.node.author.login,
        authorAvatarUrl: data.node.author.avatarUrl,
        reactions: parseReactions(data.node.reactions.edges),
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
