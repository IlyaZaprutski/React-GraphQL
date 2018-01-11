import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Card, CardHeader, CardText } from 'material-ui/Card';

import Reactions from 'components/reactions/reactions';

export default class CommentCard extends React.PureComponent {
    static propTypes = {
        authorLogin: PropTypes.string.isRequired,
        authorAvatarUrl: PropTypes.string.isRequired,
        bodyHTML: PropTypes.string.isRequired,
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
        const {
            authorLogin, authorAvatarUrl, bodyHTML, classNames, reactions,
        } = this.props;

        const commentCardClassNames = classnames('comment-card', classNames);

        return (
            <div className={commentCardClassNames}>
                <Card>
                    <CardHeader title={authorLogin} avatar={authorAvatarUrl} />
                    <CardText>
                        <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
                    </CardText>

                    <Reactions reactions={reactions} />
                </Card>
            </div>
        );
    }
}
