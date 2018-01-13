import { connect } from 'react-redux';

import Main from 'components/main/main';

export default connect(state => ({
    userLogin: state.authInfo.get('login'),
    userAvatarUrl: state.authInfo.get('avatarUrl'),
    isHaveAccess: state.authInfo.get('isHaveAccess'),
}))(Main);
