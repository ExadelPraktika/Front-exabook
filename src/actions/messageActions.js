
import {
  ADD_USER_TO_CHAT
} from './types';
// Get market
export const addtoChatArrray = (friend) => dispatch => {
  console.log('add to friend chat arr');
      dispatch({
        type: ADD_USER_TO_CHAT,
        payload: friend
      })
    
};
