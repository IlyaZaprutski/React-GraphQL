import React from 'react';

import { Mutation } from 'react-apollo';

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

export default ({
    issueId, placeholder, btnLabel, emptyCommentWarningMsg,
}) => (
    <Mutation
        mutation={AddIssueComment}
        refetchQueries={() => [
            {
                query: GetIssueInfo,
                variables: {
                    issueId,
                },
            },
        ]}
        // update={(proxy, { data: { addComment } }) => {
        //     const issueStoreInfo = proxy.readQuery({
        //         query: GetIssueInfo,
        //         variables: { issueId },
        //     });

        //     issueStoreInfo.node.comments.edges.push(addComment.commentEdge);
        //     proxy.writeQuery({ query: GetIssueInfo, data: issueStoreInfo });
        // }}
    >
        {(mutate, { loading, error, data }) => (
            <CreateComment
                onCreateComment={(id, commentText) =>
                    mutate({
                        variables: { commentText, issueId: id },
                        // optimisticResponse: createOptimisticResponse(
                        //     ownProps.authorLogin,
                        //     ownProps.authorAvatarUrl,
                        //     commentText,
                        // ),
                    })
                }
                issueId={issueId}
                btnLabel={btnLabel}
                placeholder={placeholder}
                emptyCommentWarningMsg={emptyCommentWarningMsg}
            />
        )}
    </Mutation>
);
