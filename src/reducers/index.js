import { combineReducers } from 'redux';
import authReducer from './authReducer';
import marketReducer from './marketReducer'
import eventReducer from './eventReducer';
import postReducer from './postReducer';
import { filterReducer } from '../components/Events/Filter/index'

export default combineReducers({
  auth: authReducer,
  market: marketReducer,
  event: eventReducer,
  feed: postReducer,
  filters: filterReducer
});