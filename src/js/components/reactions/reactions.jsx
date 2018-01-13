import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import Reaction from 'components/reaction/reaction';
import { reactionTypes } from 'constants/reactions-constants';

import './reactions.scss';

const reactionMenuItem = [
    {
        type: reactionTypes.THUMBS_UP,
        label: 'Thumbs up',
    },
    {
        type: reactionTypes.THUMBS_DOWN,
        label: 'Thumbs down',
    },
    {
        type: reactionTypes.LAUGH,
        label: 'Laugh',
    },
    {
        type: reactionTypes.HOORAY,
        label: 'Hooray',
    },
    {
        type: reactionTypes.CONFUSED,
        label: 'Confused',
    },
    {
        type: reactionTypes.HEART,
        label: 'Heart',
    },
];

export default class Reactions extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        reactionGroups: PropTypes.arrayOf(PropTypes.shape({
            reactionType: PropTypes.string.isRequired,
            isReacted: PropTypes.bool.isRequired,
            reactionCount: PropTypes.number.isRequired,
            users: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                login: PropTypes.string.isRequired,
                avatarUrl: PropTypes.string.isRequired,
            })).isRequired,
        })).isRequired,
        onAddReaction: PropTypes.func.isRequired,
        onRemoveReaction: PropTypes.func.isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    state = {
        isReactionMenuOpen: false,
        anchorMenuEl: null,
    };

    onClickReaction = (reactionType) => {
        const {
            id, reactionGroups, onRemoveReaction, onAddReaction,
        } = this.props;

        const reactionInfo = reactionGroups.find(reactionGroup => reactionGroup.reactionType === reactionType);

        if (!reactionInfo || !reactionInfo.isReacted) {
            onAddReaction(id, reactionInfo.reactionType);
        } else {
            onRemoveReaction(id, reactionInfo.reactionType);
        }
    };

    onCloseReactionMenu = () => {
        this.setState({
            isReactionMenuOpen: false,
        });
    };

    onOpenReactionMenu = (event) => {
        event.preventDefault();

        this.setState({
            isReactionMenuOpen: true,
            anchorMenuEl: event.currentTarget,
        });
    };

    render() {
        const { classNames } = this.props;
        const { isReactionMenuOpen, anchorMenuEl } = this.state;

        const reactionsClassNames = classnames('reactions', classNames);

        return (
            <div className={reactionsClassNames}>
                {this.props.reactionGroups.reduce((result, reaction) => {
                    if (reaction.reactionCount) {
                        return result.concat(<Reaction
                            key={reaction.reactionType}
                            reactionType={reaction.reactionType}
                            reactionCount={reaction.reactionCount}
                            onClickReaction={this.onClickReaction}
                        />);
                    }
                    return result;
                }, [])}

                <div className="reactions__add-reaction-btn-container">
                    <RaisedButton onClick={this.onOpenReactionMenu} label="Add reaction" />
                    <Popover
                        open={isReactionMenuOpen}
                        anchorEl={anchorMenuEl}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        onRequestClose={this.onCloseReactionMenu}
                    >
                        <Menu>
                            {reactionMenuItem.map(reaction => (
                                <MenuItem
                                    key={reaction.type}
                                    primaryText={reaction.label}
                                    onClick={() => {
                                        this.onClickReaction(reaction.type);
                                        this.setState({
                                            isReactionMenuOpen: false,
                                        });
                                    }}
                                />
                            ))}
                        </Menu>
                    </Popover>
                </div>
            </div>
        );
    }
}
