import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

import LoginFormContainer from 'containers/login-form-container';

import Routes from 'routes';

import './main.scss';

export default class Main extends React.PureComponent {
    static propTypes = {
        userLogin: PropTypes.string.isRequired,
        userAvatarUrl: PropTypes.string.isRequired,
        isHaveAccess: PropTypes.bool.isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    state = {
        isMenuOpen: true,
    };

    onToggleMenuClick = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        });
    };

    getContent() {
        const { isHaveAccess, userAvatarUrl, userLogin } = this.props;

        const mainContentClassNames = classnames('main__content', {
            'main__content_left-shifted': this.state.isMenuOpen,
        });

        if (isHaveAccess) {
            return (
                <Router>
                    <div>
                        <AppBar
                            title="React + GraphQL"
                            onLeftIconButtonClick={this.onToggleMenuClick}
                            className="main__app-bar"
                            iconElementRight={
                                <div className="main__user-info">
                                    <div className="main__user-login">{userLogin}</div>
                                    <Avatar src={userAvatarUrl} size={50} />
                                </div>
                            }
                        />
                        <div className="main__nav">
                            <Drawer open={this.state.isMenuOpen} containerStyle={{ marginTop: 64 }}>
                                {Routes.filter(r => r.isMenuVisible).map(route => (
                                    <NavLink
                                        key={route.path}
                                        to={route.path}
                                        className="main__nav-link"
                                        activeClassName="main__nav-link_active"
                                    >
                                        <MenuItem
                                            primaryText={route.name}
                                            className="main__nav-link-title"
                                        />
                                    </NavLink>
                                ))}
                            </Drawer>
                        </div>

                        <div className={mainContentClassNames}>
                            <div className="main__component">
                                {Routes.map(route => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        component={route.component}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </Router>
            );
        }

        return <LoginFormContainer />;
    }

    render() {
        const { classNames } = this.props;

        const mainClassNames = classnames('main', classNames);

        return <div className={mainClassNames}>{this.getContent()}</div>;
    }
}
