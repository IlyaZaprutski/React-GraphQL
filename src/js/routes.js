import UsersInfoContainer from 'containers/users-info-container';
import RepositoriesInfoContainer from 'containers/repositories-info-container';
import RepositoryIssuesContainer from 'gql-containers/repository-issues-gql-container';
import IssueInfoContainer from 'gql-containers/issue-info-gql-container';

export default [
    {
        name: 'Users Info',
        path: '/UsersInfo',
        component: UsersInfoContainer,
        props: {},
    },
    {
        name: 'Repositories Info',
        path: '/RepositoriesInfo',
        component: RepositoriesInfoContainer,
        props: {},
    },
    {
        name: 'Repository Issues',
        path: '/RepositoryIssues/:repositoryId',
        component: RepositoryIssuesContainer,
        props: {},
    },
    {
        name: 'Issue',
        path: '/Issue/:issueId',
        component: IssueInfoContainer,
        props: {},
    },
];
