import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { groupBy, map } from 'lodash';

import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down';
import LaughIcon from 'material-ui/svg-icons/social/mood';
import ConfusedIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import HoorayIcon from 'material-ui/svg-icons/social/cake';
import HeartIcon from 'material-ui/svg-icons/action/favorite';

import Badge from 'material-ui/Badge';

const REACTION_TYPES = {
    THUMBS_UP: 'THUMBS_UP',
    THUMBS_DOWN: 'THUMBS_DOWN',
    LAUGH: 'LAUGH',
    HOORAY: 'HOORAY',
    CONFUSED: 'CONFUSED',
    HEART: 'HEART',
};

const getReaction = (type) => {
    switch (type) {
    case REACTION_TYPES.THUMBS_UP:
        return <ThumbUpIcon />;
    case REACTION_TYPES.THUMBS_DOWN:
        return <ThumbDownIcon />;
    case REACTION_TYPES.LAUGH:
        return <LaughIcon />;
    case REACTION_TYPES.HOORAY:
        return <HoorayIcon />;
    case REACTION_TYPES.CONFUSED:
        return <ConfusedIcon />;
    case REACTION_TYPES.HEART:
        return <HeartIcon />;

    default:
        return null;
    }
};

const getReactions = groupedReactions =>
    map(groupedReactions, (groupReactions, reactionType) => (
        <Badge key={reactionType} badgeContent={groupReactions.length} primary>
            {getReaction(reactionType)}
        </Badge>
    ));

export default class Reactions extends React.PureComponent {
    static propTypes = {
        reactions: PropTypes.arrayOf(PropTypes.shape({
            reactionType: PropTypes.string.isRequired,
            userLogin: PropTypes.string.isRequired,
            userAvatarUrl: PropTypes.string.isRequired,
        })).isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    render() {
        const { reactions, classNames } = this.props;

        const reactionsClassNames = classnames('reactions', classNames);

        return (
            <div className={reactionsClassNames}>
                {getReactions(groupBy(reactions, 'reactionType'))}
            </div>
        );
    }
}
