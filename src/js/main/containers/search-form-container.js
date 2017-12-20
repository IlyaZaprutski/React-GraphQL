import { connect } from 'react-redux';

import SearchForm from 'main/components/search-form/search-form';

import { changeSearchString } from 'main/actions/main-actions';

export default connect(
    state => ({
        searchString: state.mainInfo.get('searchString'),
    }),
    dispatch => ({
        onClickSearchBtn: searchString => dispatch(changeSearchString(searchString)),
    }),
)(SearchForm);
