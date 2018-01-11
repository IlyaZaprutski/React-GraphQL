import { connect } from 'react-redux';

import Main from 'components/main/main';

export default connect(state => ({
    isHaveAccess: state.authInfo.get('isHaveAccess'),
}))(Main);
