import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SearchForm from 'components/search-form/search-form';

import RepositoriesListQGLContainer from 'gql-containers/repositories-list-gql-container';

export default class UsersInfo extends React.PureComponent {
    static propTypes = {
        searchString: PropTypes.string.isRequired,
        onChangeSearchString: PropTypes.func.isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    render() {
        const { classNames, searchString, onChangeSearchString } = this.props;

        const repositoriesInfoClassNames = classnames('repositories-info', classNames);

        return (
            <div className={repositoriesInfoClassNames}>
                <SearchForm
                    searchString={searchString}
                    onChangeSearchString={onChangeSearchString}
                    title="Github Repositories"
                    placeholder="Enter github repo name"
                />

                {searchString && <RepositoriesListQGLContainer searchString={searchString} />}
            </div>
        );
    }
}
