import isEmpty from '../validation/is-empty';
import {SET_CURRENT_USER, REFRESH_USER, REMOVE_BOUGHT_ITEMS, REMOVE_SOLD_ITEM} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case REFRESH_USER:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case REMOVE_BOUGHT_ITEMS:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case REMOVE_SOLD_ITEM:
      return {
        ...state
      };
    default:
      return state;
  }
}