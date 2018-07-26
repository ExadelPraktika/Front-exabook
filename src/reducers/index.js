import { combineReducers } from 'redux';
import authReducer from './authReducer';
import marketReducer from './marketReducer'
import eventReducer from './eventReducer';
import { filterReducer } from '../components/Events/Filter/index'
export default combineReducers({
  auth: authReducer,
  market: marketReducer,
  filters: filterReducer,
  event: eventReducer
});