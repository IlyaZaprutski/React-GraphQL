import { connect } from 'react-redux';

import Main from 'main/components/main/main';

import { changeSelectedUser } from 'main/actions/main-actions';

export default connect(
    state => ({
        isHaveAccess: state.authInfo.get('isHaveAccess'),
        searchString: state.mainInfo.get('searchString'),
        selectedUserId: state.mainInfo.get('selectedUserId'),
    }),
    dispatch => ({
        onSelectUser: userId => dispatch(changeSelectedUser(userId)),
    }),
)(Main);
