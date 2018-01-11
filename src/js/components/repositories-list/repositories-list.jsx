import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import Paper from 'material-ui/Paper';
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

import './repositories-list.scss';

export default class RepositoriesList extends React.PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        repositories: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            forksCount: PropTypes.number.isRequired,
            watchersCount: PropTypes.number.isRequired,
            starsCount: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
        })).isRequired,
        repositoriesCount: PropTypes.number.isRequired,
        onLoadRepositories: PropTypes.func,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        onLoadRepositories: () => {},
        classNames: '',
    };

    getContent() {
        const { isLoading, repositories } = this.props;

        if (isLoading) {
            return (
                <div className="repositories-list__spinner-container">
                    <CircularProgress size={60} thickness={7} />
                </div>
            );
        }

        if (!isLoading && !repositories.length) {
            return <p>No results</p>;
        }

        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Watchers</TableHeaderColumn>
                        <TableHeaderColumn>Stars</TableHeaderColumn>
                        <TableHeaderColumn>Forks</TableHeaderColumn>
                        <TableHeaderColumn />
                        <TableHeaderColumn />
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {repositories.map(repository => (
                        <TableRow className="repositories-list__item" key={repository.id}>
                            <TableRowColumn>{repository.name}</TableRowColumn>
                            <TableRowColumn>{repository.watchersCount}</TableRowColumn>
                            <TableRowColumn>{repository.starsCount}</TableRowColumn>
                            <TableRowColumn>{repository.forksCount}</TableRowColumn>
                            <TableRowColumn>
                                <a href={repository.url} target="_blank">
                                    Go to page
                                </a>
                            </TableRowColumn>
                            <TableRowColumn>
                                <NavLink to={`RepositoryIssues/${repository.id}`}>
                                    Go to issues
                                </NavLink>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    render() {
        const {
            repositoriesCount, repositories, classNames, onLoadRepositories,
        } = this.props;

        const resultsPanelClassNames = classnames('repositories-list', classNames);

        return (
            <div className={resultsPanelClassNames}>
                <Paper className="repositories-list__paper-container" zDepth={3}>
                    <h4>{`All repositories count : ${repositoriesCount}`}</h4>
                    <h4>{`Current number of repositories: ${repositories.length}`}</h4>
                    <RaisedButton
                        label="Load more"
                        primary
                        onClick={onLoadRepositories}
                        disabled={repositoriesCount === repositories.length}
                    />

                    {this.getContent()}
                </Paper>
            </div>
        );
    }
}
