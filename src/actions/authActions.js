import { SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {getEvents} from './eventActions';
// Get  Current User
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
    payload: user
  };
};

export const addAvatar = (id, data) => dispatch => {
  console.log('suveike')
  axios
    .put(`http://localhost:3001/users/avatar/${id}`, data)
    .then(res => {
      dispatch(setCurrentUser(res.data.user))
      dispatch(getEvents())
   })
  };

//Log user out
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem('jwtToken');
  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
}