import React from 'react';
import PropTypes from 'prop-types';

import LoginFormContainer from 'main/containers/login-form-container';
import SearchFormContainer from 'main/containers/search-form-container';
import ResultsPanelQGLContainer from 'main/gql-containers/results-panel-gql-container';

export default class Main extends React.PureComponent {
    static propTypes = {
        isHaveAccess: PropTypes.bool.isRequired,
        searchString: PropTypes.string.isRequired,
        selectedUserId: PropTypes.string.isRequired,
        onSelectUser: PropTypes.func.isRequired,
    };

    render() {
        const {
            isHaveAccess, searchString, selectedUserId, onSelectUser,
        } = this.props;

        return (
            <div>
                {isHaveAccess ? (
                    <div>
                        <SearchFormContainer />
                        {searchString && (
                            <ResultsPanelQGLContainer
                                searchString={searchString}
                                selectedUserId={selectedUserId}
                                onSelectUser={onSelectUser}
                            />
                        )}
                    </div>
                ) : (
                    <LoginFormContainer />
                )}
            </div>
        );
    }
}
