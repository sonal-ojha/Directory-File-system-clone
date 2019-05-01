import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { createItemReducer } from '../reducers/createItem.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    createItemReducer,
});

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware( logger, thunk),
));
  
export default store;