import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import LoginFormContainer from 'main/containers/login-form-container';
import SearchForm from 'main/components/search-form/search-form';

import ResultsPanelQGLContainer from 'main/gql-containers/results-panel-gql-container';

export default class Main extends React.PureComponent {
    static propTypes = {
        isHaveAccess: PropTypes.bool.isRequired,
        searchString: PropTypes.string.isRequired,
        selectedUserId: PropTypes.string.isRequired,
        onSelectUser: PropTypes.func.isRequired,
        onChangeSearchString: PropTypes.func.isRequired,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        classNames: '',
    };

    getContent() {
        const {
            isHaveAccess,
            searchString,
            selectedUserId,
            onSelectUser,
            onChangeSearchString,
        } = this.props;

        if (isHaveAccess) {
            return (
                <div>
                    <SearchForm
                        searchString={searchString}
                        onChangeSearchString={onChangeSearchString}
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

        return <LoginFormContainer />;
    }

    render() {
        const { classNames } = this.props;

        const mainClassNames = classnames('main', classNames);

        return <div className={mainClassNames}>{this.getContent()}</div>;
    }
}
