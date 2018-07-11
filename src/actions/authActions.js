import { SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
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

//Log user out
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem('jwtToken');
  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
}