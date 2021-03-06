import axios from 'axios';

import {
  GET_PEOPLE,
  SEND_REQUEST,
  GET_FRIENDS,
  DELETE_FRIEND,
  FRIEND_LOADING
} from './types';

export const getPeopleList = (id) => dispatch => {
  dispatch(setLoading())
  axios
    .get(`http://localhost:3001/users/friends/search/${id}`)
    .then(res => 
      dispatch({
        type: GET_PEOPLE,
        payload: res.data.resp
      })
    );
};

export const getUserFriends = (id) => dispatch => {
  dispatch(setLoading())
  axios
    .get(`http://localhost:3001/users/friends/${id}`)
    .then(res => 
      dispatch({
        type: GET_FRIENDS,
        payload: res.data
      })
    );
};

export const sendFriendReq = (id, id2) => dispatch => {
  axios
    .put(`http://localhost:3001/users/friends/add/${id}/${id2}`)
    .then(res => {
      dispatch(getUserFriends(id))
      dispatch(getPeopleList(id))}
    );
};

export const deleteFriend = (id, id2) => dispatch => {
  axios
    .put(`http://localhost:3001/users/friends/delete/${id}/${id2}`)
    .then(res => {
      dispatch(getUserFriends(id))
      dispatch(getPeopleList(id))}
    );
};

export const setLoading = () => {
  return {
    type: FRIEND_LOADING
  };
};