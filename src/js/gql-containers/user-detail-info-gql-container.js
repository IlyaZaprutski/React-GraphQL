import { graphql } from 'react-apollo';

import UserDetailInfo from 'components/user-detail-info/user-detail-info';

import { GetUserDetailInfoQuery } from 'queries/user-queries';

const mapDataToProps = ({ userDetailInfo }) => {
    if (userDetailInfo.loading) {
        return {
            isLoading: true,
            userId: userDetailInfo.variables.userId,
            avatarUrl: '',
            userName: '',
            repositories: [],
        };
    }

    return {
        isLoading: userDetailInfo.loading,
        avatarUrl: userDetailInfo.node.avatarUrl,
        userName: userDetailInfo.node.name,
        repositories: userDetailInfo.node.repositories.edges.map(edge => ({
            id: edge.node.id,
            name: edge.node.name,
            description: edge.node.description,
            countIssues: edge.node.issues.totalCount,
        })),
    };
};

const mapPropsToOptions = ({ userId }) => ({
    variables: {
        userId,
    },
});

export default graphql(GetUserDetailInfoQuery, {
    props: mapDataToProps,
    options: mapPropsToOptions,
    skip: props => !props.userId,
    name: 'userDetailInfo',
})(UserDetailInfo);
