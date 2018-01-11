import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SearchForm from 'components/search-form/search-form';
import ResultsPanelQGLContainer from 'gql-containers/results-panel-gql-container';

export default class UsersInfo extends React.PureComponent {
    static propTypes = {
        searchString: PropTypes.string.isRequired,
        selectedUserId: PropTypes.string.isRequired,
        onSelectUser: PropTypes.func.isRequired,
        onChangeSearchString: PropTypes.func.isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    render() {
        const {
            selectedUserId,
            classNames,
            searchString,
            onSelectUser,
            onChangeSearchString,
        } = this.props;

        const usersInfoClassNames = classnames('users-info', classNames);

        return (
            <div className={usersInfoClassNames}>
                <SearchForm
                    searchString={searchString}
                    onChangeSearchString={onChangeSearchString}
                    title="Github Users"
                    placeholder="Enter github user name"
                />
                {searchString && (
                    <ResultsPanelQGLContainer
                        searchString={searchString}
                        selectedUserId={selectedUserId}
                        onSelectUser={onSelectUser}
                    />
                )}
            </div>
        );
    }
}
