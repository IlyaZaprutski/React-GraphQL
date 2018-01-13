import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Card, CardHeader, CardText } from 'material-ui/Card';

import IssueReactionGQLContainer from 'gql-containers/issue-reactions-gql-container';

import './comment-card.scss';

export default class CommentCard extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        authorLogin: PropTypes.string.isRequired,
        authorAvatarUrl: PropTypes.string.isRequired,
        bodyHTML: PropTypes.string.isRequired,
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
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    render() {
        const {
            id,
            authorLogin,
            authorAvatarUrl,
            bodyHTML,
            classNames,
            reactionGroups,
        } = this.props;

        const commentCardClassNames = classnames('comment-card', classNames);

        return (
            <div className={commentCardClassNames}>
                <Card>
                    <CardHeader title={authorLogin} avatar={authorAvatarUrl} />
                    <CardText className="comment-card__text-html">
                        <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
                    </CardText>

                    <IssueReactionGQLContainer id={id} reactionGroups={reactionGroups} />
                </Card>
            </div>
        );
    }
}
