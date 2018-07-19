import { combineReducers } from 'redux';
import authReducer from './authReducer';
import marketReducer from './marketReducer'
import eventReducer from './eventReducer';

export default combineReducers({
  auth: authReducer,
  market: marketReducer,
  event: eventReducer
});