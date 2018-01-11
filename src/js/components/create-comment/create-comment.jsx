import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import './create-comment.scss';

const ENTER_KEY_CODE = 13;

export default class CreateComment extends React.PureComponent {
    static propTypes = {
        issueId: PropTypes.string.isRequired,
        btnLabel: PropTypes.string.isRequired,
        onCreateComment: PropTypes.func.isRequired,
        emptyCommentWarningMsg: PropTypes.string,
        placeholder: PropTypes.string,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        emptyCommentWarningMsg: '',
        placeholder: '',
        classNames: '',
    };

    state = {
        commentText: '',
        isSnackbarOpen: false,
    };

    onChangeCommentText = (e, val) => {
        this.setState({
            commentText: val,
        });
    };

    onCreateComment = () => {
        if (!this.state.commentText) {
            this.setState({
                isSnackbarOpen: true,
            });
        } else {
            this.props.onCreateComment(this.props.issueId, this.state.commentText);
            this.setState({
                commentText: '',
            });
        }
    };

    onCloseSnackbar = () => {
        this.setState({
            isSnackbarOpen: false,
        });
    };

    onKeyDownCommentText = (event) => {
        if (event.keyCode === ENTER_KEY_CODE && this.state.commentText.trim() && !event.shiftKey) {
            event.preventDefault();
            this.onCreateComment();
        }
    };

    render() {
        const {
            btnLabel, placeholder, emptyCommentWarningMsg, classNames,
        } = this.props;

        const createCommentClassNames = classnames('create-comment', classNames);

        return (
            <div className={createCommentClassNames}>
                <Card className="create-comment__card">
                    <TextField
                        floatingLabelText={placeholder}
                        multiLine
                        value={this.state.commentText}
                        onChange={this.onChangeCommentText}
                        rows={1}
                        fullWidth
                        onKeyDown={this.onKeyDownCommentText}
                    />
                    <RaisedButton
                        label={btnLabel}
                        fullWidth
                        primary
                        onClick={this.onCreateComment}
                    />
                </Card>
                <Snackbar
                    open={this.state.isSnackbarOpen}
                    message={emptyCommentWarningMsg}
                    autoHideDuration={4000}
                    onRequestClose={this.onCloseSnackbar}
                />
            </div>
        );
    }
}
