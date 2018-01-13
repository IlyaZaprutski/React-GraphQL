import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down';
import LaughIcon from 'material-ui/svg-icons/social/mood';
import ConfusedIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import HoorayIcon from 'material-ui/svg-icons/social/cake';
import HeartIcon from 'material-ui/svg-icons/action/favorite';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

import { reactionTypes } from 'constants/reactions-constants';

import './reaction.scss';

const reactionsInfo = {
    [reactionTypes.THUMBS_UP]: { label: 'thumbs up', iconConstructor: ThumbUpIcon },
    [reactionTypes.THUMBS_DOWN]: { label: 'thumbs down', iconConstructor: ThumbDownIcon },
    [reactionTypes.LAUGH]: { label: 'laugh', iconConstructor: LaughIcon },
    [reactionTypes.HOORAY]: { label: 'hooray', iconConstructor: HoorayIcon },
    [reactionTypes.CONFUSED]: { label: 'confused', iconConstructor: ConfusedIcon },
    [reactionTypes.HEART]: { label: 'heart', iconConstructor: HeartIcon },
};

export default class Reaction extends React.PureComponent {
    static propTypes = {
        reactionType: PropTypes.string.isRequired,
        reactionCount: PropTypes.number.isRequired,

        onClickReaction: PropTypes.func,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        onClickReaction: () => {},
        classNames: '',
    };

    onClickReactionIcon = () => {
        const { reactionType, onClickReaction } = this.props;

        onClickReaction(reactionType);
    };

    render() {
        const { reactionCount, reactionType, classNames } = this.props;

        const reactionClassNames = classnames('reaction', classNames);
        const reactionInfo = reactionsInfo[reactionType];
        const IconConstructor = reactionInfo.iconConstructor;

        return (
            <div className={reactionClassNames}>
                {
                    <Badge
                        className="reaction__badge"
                        key={reactionType}
                        badgeContent={reactionCount}
                        primary
                        badgeStyle={{ top: 12, right: 12 }}
                    >
                        <IconButton
                            className="reaction__badge-icon"
                            tooltip={`Reacted with ${reactionInfo.label} emoji`}
                            onClick={this.onClickReactionIcon}
                        >
                            <IconConstructor />
                        </IconButton>
                    </Badge>
                }
            </div>
        );
    }
}
