import { ADD_USER_TO_CHAT } from '../actions/types';

const initialState = {
  chatList: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_USER_TO_CHAT:
    if (state.chatList.filter(function(e) { return e._id === action.payload._id; }).length > 0) {
      return {
        ...state,
      };
    }
    else {
      return {
        ...state,
        chatList: [action.payload, ...state.chatList]
      };
    }

    default:
      return state;
  }
}