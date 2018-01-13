import gql from 'graphql-tag';

import ReactionGroupFragment from 'fragments/reaction-groups-fragments';

export default gql`
    fragment IssueCommentFragment on IssueComment {
        id
        author {
            login
            avatarUrl
        }
        bodyHTML
        reactionGroups {
            ...ReactionGroupFragment
        }
    }
    ${ReactionGroupFragment}
`;
