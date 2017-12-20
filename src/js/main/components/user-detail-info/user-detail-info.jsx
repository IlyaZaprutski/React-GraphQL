import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import Avatar from 'material-ui/Avatar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import './user-detail-info.scss';

export default class UserDetailInfo extends React.PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        avatarUrl: PropTypes.string,
        userName: PropTypes.string,

        repositories: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            countIssues: PropTypes.number.isRequired,
            description: PropTypes.string,
        })),

        onClose: PropTypes.func.isRequired,
    };

    static defaultProps = {
        avatarUrl: '',
        userName: '',
        repositories: [],
    };

    render() {
        const {
            userName, avatarUrl, repositories, isOpen, isLoading, onClose,
        } = this.props;

        return (
            <Dialog
                title={userName}
                actions={[<FlatButton label="Cancel" primary onClick={onClose} />]}
                modal={false}
                open={isOpen}
                className="user-detail-info-dialog"
                autoScrollBodyContent
            >
                {isLoading ? (
                    <div className="user-detail-info-dialog__spinner-container">
                        <CircularProgress size={60} thickness={7} />
                    </div>
                ) : (
                    <div>
                        <Avatar src={avatarUrl} size={100} />
                        {repositories.length === 0 ? (
                            <div>User have not got repositories</div>
                        ) : (
                            <Table>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Repo Name</TableHeaderColumn>
                                        <TableHeaderColumn>Description</TableHeaderColumn>
                                        <TableHeaderColumn>Number of issues</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {repositories.map(repo => (
                                        <TableRow key={repo.id}>
                                            <TableRowColumn>{repo.name}</TableRowColumn>
                                            <TableRowColumn>{repo.description}</TableRowColumn>
                                            <TableRowColumn>{repo.countIssues}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                )}
            </Dialog>
        );
    }
}
