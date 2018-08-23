import {REFRESH_USER, SET_CURRENT_USER, REMOVE_BOUGHT_ITEMS, REMOVE_SOLD_ITEM} from './types';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {getEvents} from './eventActions';
import {clearChatList} from './chatActions';
export const setCurrent = userToken => dispatch => {

  localStorage.setItem('jwtToken', userToken);
  setAuthToken(userToken);
  const decoded = jwt_decode(userToken);
  axios.get('http://localhost:3001/users/get/'+ decoded.sub)
    .then(res => {
       dispatch(setCurrentUser(res.data.user))
    })
    
};

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
    
  };
};

export const addAvatar = (id, data) => dispatch => {
  axios
    .put(`http://localhost:3001/users/avatar/${id}`, data)
    .then(res => {
      dispatch(setCurrentUser(res.data.user));
      dispatch(getEvents())
   })
  };

export const refreshUser = userId => dispatch => {
  axios
    .post('http://localhost:3001/users/refresh', { userId: userId })
    .then(res =>
      dispatch({
        type: REFRESH_USER,
        payload: res.data
      })
    )
};

export const removeBoughtItems = (userId, sellingTo) => dispatch => {
  axios
    .post('http://localhost:3001/users/remove/boughtItems', { userId: userId, sellingTo: sellingTo })
    .then(res =>
      dispatch({
        type: REMOVE_BOUGHT_ITEMS,
        payload: res.data
      })
    )
};

export const removeSoldItem = postId => dispatch => {
  axios
    .post('http://localhost:3001/users/remove/soldItem', { postId: postId })
    .then(res =>
      dispatch({
        type: REMOVE_SOLD_ITEM,
        payload: res.data
      })
    )
};


export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(clearChatList());
};