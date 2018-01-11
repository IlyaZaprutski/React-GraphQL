import { connect } from 'react-redux';

import RepositoriesInfo from 'components/repositories-info/repositories-info';

import { changeSearchString } from 'actions/repositories-info-actions';

export default connect(
    state => ({
        searchString: state.repositoriesInfo.get('searchString'),
    }),
    dispatch => ({
        onChangeSearchString: searchString => dispatch(changeSearchString(searchString)),
    }),
)(RepositoriesInfo);
