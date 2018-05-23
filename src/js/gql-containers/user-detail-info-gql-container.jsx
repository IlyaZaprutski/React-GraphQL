import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import UserDetailInfo from 'components/user-detail-info/user-detail-info';

import { GetUserDetailInfoQuery } from 'queries/user-queries';

const UserDetailInfoContainer = ({ userId, isOpen, onClose }) => (
    <Query query={GetUserDetailInfoQuery} variables={{ userId }} skip={!userId}>
        {({ loading, data }) => {
            if (loading) return null;
            return (
                <UserDetailInfo
                    isOpen={isOpen}
                    isLoading={loading}
                    onClose={onClose}
                    avatarUrl={data.node.avatarUrl}
                    userName={data.node.name}
                    repositories={data.node.repositories.edges.map(edge => ({
                        id: edge.node.id,
                        name: edge.node.name,
                        description: edge.node.description,
                        countIssues: edge.node.issues.totalCount,
                    }))}
                />
            );
        }}
    </Query>
);

UserDetailInfoContainer.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    userId: PropTypes.string,
};

UserDetailInfoContainer.defaultProps = {
    userId: '',
};

export default UserDetailInfoContainer;
