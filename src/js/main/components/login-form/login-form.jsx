import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './login-form.scss';

export default class LoginForm extends React.PureComponent {
    static propTypes = {
        login: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        onChangeLogin: PropTypes.func.isRequired,
        onChangePassword: PropTypes.func.isRequired,
        onClickLoginBtn: PropTypes.func.isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    onChangeLogin = (e, val) => this.props.onChangeLogin(val);
    onChangePassword = (e, val) => this.props.onChangePassword(val);

    render() {
        const {
            login, password, classNames, onClickLoginBtn,
        } = this.props;

        const loginFormClassNames = classnames('login-form', classNames);

        return (
            <div className={loginFormClassNames}>
                <Paper className="login-form__paper-container" zDepth={3}>
                    <TextField
                        className="login-form__login-input"
                        hintText="Login Field"
                        floatingLabelText="Login"
                        value={login}
                        onChange={this.onChangeLogin}
                        fullWidth
                    />

                    <TextField
                        className="login-form__password-input"
                        hintText="Password Field"
                        floatingLabelText="Password"
                        value={password}
                        type="password"
                        onChange={this.onChangePassword}
                        fullWidth
                    />

                    <RaisedButton
                        className="login-form__login-btn"
                        label="Login"
                        primary
                        onClick={onClickLoginBtn}
                    />
                </Paper>
            </div>
        );
    }
}
