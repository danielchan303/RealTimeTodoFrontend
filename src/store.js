import { combineReducers, createStore } from 'redux';
import authReducer from './App/store/reducers/auth';
import todoListsReducer from './App/store/reducers/todoLists';
import socketReducer from './App/store/reducers/socket';

const rootReducer = combineReducers({ auth: authReducer, todoLists: todoListsReducer, socket: socketReducer });
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;