import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import CreateComment from 'components/create-comment/create-comment';

import { AddIssueComment } from 'mutations/comment-mutations';
import { GetIssueInfo } from 'queries/issue-queries';

const createOptimisticResponse = (authorLogin, authorAvatarUrl, commentText) => ({
    addComment: {
        __typename: 'AddCommentPayload',
        commentEdge: {
            __typename: 'IssueCommentEdge',
            node: {
                __typename: 'IssueComment',
                author: {
                    avatarUrl: authorAvatarUrl,
                    login: authorLogin,
                    __typename: 'User',
                },
                bodyHTML: `<p>${commentText}</p>`,
                id: 'test-id',
                reactionGroups: [],
            },
        },
    },
});

const mapDataToProps = ({ mutate, ownProps }) => ({
    onCreateComment: (issueId, commentText) =>
        mutate({
            variables: { commentText, issueId },
            // refetchQueries: [
            //     {
            //         query: GetIssueInfo,
            //         variables: {
            //             issueId,
            //         },
            //     },
            // ],
            optimisticResponse: createOptimisticResponse(
                ownProps.authorLogin,
                ownProps.authorAvatarUrl,
                commentText,
            ),
            update: (proxy, { data: { addComment } }) => {
                const issueStoreInfo = proxy.readQuery({
                    query: GetIssueInfo,
                    variables: { issueId },
                });

                issueStoreInfo.node.comments.edges.push(addComment.commentEdge);
                proxy.writeQuery({ query: GetIssueInfo, data: issueStoreInfo });
            },
        }),
    ...ownProps,
});

export default compose(
    connect(
        state => ({
            authorLogin: state.authInfo.get('login'),
            authorAvatarUrl: state.authInfo.get('avatarUrl'),
        }),
        () => ({}),
    ),
    graphql(AddIssueComment, {
        props: mapDataToProps,
    }),
)(CreateComment);
