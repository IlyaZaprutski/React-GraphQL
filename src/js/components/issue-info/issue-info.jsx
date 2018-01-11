import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';

import Reactions from 'components/reactions/reactions';
import CommentCard from 'components/comment-card/comment-card';

import CreateIssueCommentGQLContainer from 'gql-containers/create-issue-comment-gql-container';

import './issue-info.scss';

export default class IssueInfo extends React.PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        bodyHTML: PropTypes.string.isRequired,
        isClosed: PropTypes.bool.isRequired,
        authorLogin: PropTypes.string.isRequired,
        authorAvatarUrl: PropTypes.string.isRequired,
        reactions: PropTypes.arrayOf(PropTypes.shape({
            reactionType: PropTypes.string.isRequired,
            userLogin: PropTypes.string.isRequired,
            userAvatarUrl: PropTypes.string.isRequired,
        })).isRequired,
        comments: PropTypes.arrayOf(PropTypes.shape({
            authorLogin: PropTypes.string.isRequired,
            authorAvatarUrl: PropTypes.string.isRequired,
            bodyHTML: PropTypes.string.isRequired,
            reactions: PropTypes.arrayOf(PropTypes.shape({
                reactionType: PropTypes.string.isRequired,
                userLogin: PropTypes.string.isRequired,
                userAvatarUrl: PropTypes.string.isRequired,
            })).isRequired,
        })).isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    getContent() {
        const {
            id,
            title,
            authorLogin,
            authorAvatarUrl,
            bodyHTML,
            isClosed,
            reactions,
            comments,
        } = this.props;

        return (
            <div>
                <Card>
                    <CardHeader title={title} subtitle={authorLogin} avatar={authorAvatarUrl} />
                    <Chip className="issue-info__issue-status">{isClosed ? 'Closed' : 'Open'}</Chip>
                    <CardText>
                        <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
                    </CardText>

                    <Reactions reactions={reactions} />
                </Card>

                {comments.map(comment => (
                    <div className="issue-info__comment-card" key={comment.id}>
                        <CommentCard
                            authorLogin={comment.authorLogin}
                            authorAvatarUrl={comment.authorAvatarUrl}
                            bodyHTML={comment.bodyHTML}
                            reactions={comment.reactions}
                        />
                    </div>
                ))}

                <CreateIssueCommentGQLContainer
                    issueId={id}
                    placeholder="Leave a comment"
                    btnLabel="Comment"
                    emptyCommentWarningMsg="You can't comment at this time — your comment cannot be blank."
                />
            </div>
        );
    }

    render() {
        const { isLoading, classNames } = this.props;

        const issueInfoClassNames = classnames('issue-info', classNames);

        let content;

        if (isLoading) {
            content = (
                <div className="issue-info__spinner-container">
                    <CircularProgress size={60} thickness={7} />
                </div>
            );
        } else {
            content = this.getContent();
        }

        return <div className={issueInfoClassNames}>{content}</div>;
    }
}
