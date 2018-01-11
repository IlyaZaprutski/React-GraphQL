import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import * as appReducers from 'reducers';

const reducer = combineReducers(appReducers);

export default createStore(reducer, applyMiddleware(thunk));
