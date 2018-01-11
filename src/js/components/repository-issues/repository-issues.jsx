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

import './repository-issues.scss';

export default class RepositoryIssues extends React.PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        repositoryId: PropTypes.string.isRequired,
        issues: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            isClosed: PropTypes.bool.isRequired,
            commentsCount: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
        })).isRequired,
        issuesCount: PropTypes.number.isRequired,
        repositoryName: PropTypes.string,
        onLoadIssues: PropTypes.func,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        repositoryName: '',
        onLoadIssues: () => {},
        classNames: '',
    };

    getContent() {
        const { isLoading, issues } = this.props;

        if (isLoading) {
            return (
                <div className="repository-issues__spinner-container">
                    <CircularProgress size={60} thickness={7} />
                </div>
            );
        }

        if (!isLoading && !issues.length) {
            return <p>No issues</p>;
        }

        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>Comments Count</TableHeaderColumn>
                        <TableHeaderColumn>Url</TableHeaderColumn>
                        <TableHeaderColumn />
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {issues.map(issue => (
                        <TableRow className="repository-issues__item" key={issue.id}>
                            <TableRowColumn>{issue.title}</TableRowColumn>
                            <TableRowColumn>{issue.isClosed ? 'Closed' : 'Open'}</TableRowColumn>
                            <TableRowColumn>{issue.commentsCount}</TableRowColumn>
                            <TableRowColumn>
                                <a href={issue.url} target="_blank">
                                    Go to page
                                </a>
                            </TableRowColumn>
                            <TableRowColumn>
                                <NavLink to={`/Issue/${issue.id}`}>Go to issue</NavLink>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    render() {
        const {
            issuesCount, repositoryName, issues, classNames, onLoadIssues,
        } = this.props;

        const resultsPanelClassNames = classnames('repository-issues', classNames);

        return (
            <div className={resultsPanelClassNames}>
                <Paper className="repository-issues__paper-container" zDepth={3}>
                    <h4>{`Repository Name : ${repositoryName}`}</h4>
                    <h4>{`All issues count : ${issuesCount}`}</h4>
                    <h4>{`Current number of issues: ${issues.length}`}</h4>
                    <RaisedButton
                        label="Load more"
                        primary
                        onClick={onLoadIssues}
                        disabled={issuesCount === issues.length}
                    />

                    {this.getContent()}
                </Paper>
            </div>
        );
    }
}
