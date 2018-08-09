import { combineReducers } from 'redux';
import authReducer from './authReducer';
import marketReducer from './marketReducer'
import eventReducer from './eventReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';
import { filterReducer } from '../components/Events/Filter/index';
import { reducer as formReducer } from 'redux-form';
import friendReducer from './friendReducer';

export default combineReducers({
  auth: authReducer,
  friends: friendReducer,
  errors: errorReducer,
  market: marketReducer,
  event: eventReducer,
  feed: postReducer,
  filters: filterReducer,
  form: formReducer

});