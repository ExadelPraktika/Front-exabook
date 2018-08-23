
import {
  ADD_USER_TO_CHAT
} from './types';
export const addtoChatArrray = (friend) => dispatch => {
      dispatch({
        type: ADD_USER_TO_CHAT,
        payload: friend
      })
    
};
