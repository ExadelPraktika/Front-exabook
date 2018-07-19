import { combineReducers } from 'redux';
import authReducer from './authReducer';
import marketReducer from './marketReducer'

export default combineReducers({
  auth: authReducer,
  market: marketReducer
});