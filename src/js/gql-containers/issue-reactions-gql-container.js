import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { remove } from 'lodash';

import Reactions from 'components/reactions/reactions';

import { AddReactionToIssue, RemoveReactionFromIssue } from 'mutations/reaction-mutations';

import ReactionGroupFragment from 'fragments/reaction-groups-fragments';

const addReactionMapDataToProps = ({ addReaction, ownProps }) => ({
    onAddReaction: (subjectId, reactionType) =>
        addReaction({
            variables: { reactionType, subjectId },
            update: (proxy, { data: { addReaction: { reaction, subject } } }) => {
                const fragmentId = `ReactionGroup__${subject.id}__${reaction.content}`;

                const reactionGroup = proxy.readFragment({
                    id: fragmentId,
                    fragment: ReactionGroupFragment,
                });

                reactionGroup.users.edges.push({
                    __typename: 'ReactingUserEdge',
                    node: {
                        id: ownProps.authorId,
                        login: ownProps.authorLogin,
                        avatarUrl: ownProps.authorAvatarUrl,
                        __typename: 'User',
                    },
                });

                reactionGroup.users.totalCount += 1;
                reactionGroup.viewerHasReacted = true;

                proxy.writeFragment({
                    id: fragmentId,
                    fragment: ReactionGroupFragment,
                    data: reactionGroup,
                });
            },
        }),
    ...ownProps,
});

const removeReactionMapDataToProps = ({ removeReaction, ownProps }) => ({
    onRemoveReaction: (subjectId, reactionType) =>
        removeReaction({
            variables: { reactionType, subjectId },
            update: (proxy, { data: { removeReaction: { reaction, subject } } }) => {
                const fragmentId = `ReactionGroup__${subject.id}__${reaction.content}`;

                const reactionGroup = proxy.readFragment({
                    id: fragmentId,
                    fragment: ReactionGroupFragment,
                });

                remove(reactionGroup.users.edges, ({ node: { id } }) => id === ownProps.authorId);
                reactionGroup.users.totalCount -= 1;
                reactionGroup.viewerHasReacted = false;

                proxy.writeFragment({
                    id: fragmentId,
                    fragment: ReactionGroupFragment,
                    data: reactionGroup,
                });
            },
        }),
    ...ownProps,
});

export default compose(
    connect(
        state => ({
            authorId: state.authInfo.get('id'),
            authorLogin: state.authInfo.get('login'),
            authorAvatarUrl: state.authInfo.get('avatarUrl'),
        }),
        () => ({}),
    ),
    graphql(AddReactionToIssue, {
        props: addReactionMapDataToProps,
        name: 'addReaction',
    }),
    graphql(RemoveReactionFromIssue, {
        props: removeReactionMapDataToProps,
        name: 'removeReaction',
    }),
)(Reactions);
