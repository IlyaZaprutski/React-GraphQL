import { connect } from 'react-redux';

import UsersInfo from 'components/users-info/users-info';

import { changeSelectedUser, changeSearchString } from 'actions/users-info-actions';

export default connect(
    state => ({
        searchString: state.usersInfo.get('searchString'),
        selectedUserId: state.usersInfo.get('selectedUserId'),
    }),
    dispatch => ({
        onSelectUser: userId => dispatch(changeSelectedUser(userId)),
        onChangeSearchString: searchString => dispatch(changeSearchString(searchString)),
    }),
)(UsersInfo);
