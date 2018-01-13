import gql from 'graphql-tag';

import ReactionGroupFragment from 'fragments/reaction-groups-fragments';
import IssueCommentFragment from 'fragments/issue-comment-fragment';

export const GetIssueInfo = gql`
    query GetIssueInfo($issueId: ID!) {
        node(id: $issueId) {
            ... on Issue {
                id
                title
                bodyHTML
                closed
                author {
                    login
                    avatarUrl
                }
                reactionGroups {
                    ...ReactionGroupFragment
                }
                comments(first: 50) {
                    edges {
                        node {
                            ...IssueCommentFragment
                        }
                    }
                }
            }
        }
    }
    ${ReactionGroupFragment}
    ${IssueCommentFragment}
`;
