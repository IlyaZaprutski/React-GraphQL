import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

import UserDetailInfoGQLContainer from 'gql-containers/user-detail-info-gql-container';

import './results-panel.scss';

export default class ResultsPanel extends React.PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        users: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired,
            avatarUrl: PropTypes.string.isRequired,
        })).isRequired,
        selectedUserId: PropTypes.string.isRequired,
        usersCount: PropTypes.number.isRequired,
        onSelectUser: PropTypes.func.isRequired,
        onLoadUsers: PropTypes.func,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        onLoadUsers: () => {},
        classNames: '',
    };

    state = {
        isUserDetailInfoOpened: false,
    };

    onClickToAvatar = (user) => {
        this.props.onSelectUser(user.id);

        this.setState({
            isUserDetailInfoOpened: true,
        });
    };

    onHandleCloseDialog = () =>
        this.setState({
            isUserDetailInfoOpened: false,
        });

    getContent() {
        const { isLoading, users } = this.props;

        if (isLoading) {
            return (
                <div className="results-panel__spinner-container">
                    <CircularProgress size={60} thickness={7} />
                </div>
            );
        }

        if (!isLoading && !users.length) {
            return <p>No results</p>;
        }

        return (
            <div className="">
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Avatar</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {users.map(user => (
                            <TableRow className="results-panel__row" key={user.id}>
                                <TableRowColumn>
                                    <Avatar
                                        src={user.avatarUrl}
                                        size={100}
                                        onClick={() => {
                                            this.onClickToAvatar(user);
                                        }}
                                    />
                                </TableRowColumn>
                                <TableRowColumn>{user.login}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    render() {
        const { isUserDetailInfoOpened } = this.state;
        const {
            selectedUserId, usersCount, users, classNames, onLoadUsers,
        } = this.props;

        const resultsPanelClassNames = classnames('results-panel', classNames);

        return (
            <div className={resultsPanelClassNames}>
                <Paper className="results-panel__paper-container" zDepth={3}>
                    <h4>{`All users count : ${usersCount}`}</h4>
                    <h4>{`Current number of users: ${users.length}`}</h4>
                    <RaisedButton
                        label="Load more"
                        primary
                        onClick={onLoadUsers}
                        disabled={usersCount === users.length}
                    />

                    {this.getContent()}

                    {isUserDetailInfoOpened && (
                        <UserDetailInfoGQLContainer
                            isOpen={isUserDetailInfoOpened}
                            onClose={this.onHandleCloseDialog}
                            userId={selectedUserId}
                        />
                    )}
                </Paper>
            </div>
        );
    }
}
