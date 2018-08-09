import axios from 'axios';

import {
  GET_PEOPLE,
  SEND_REQUEST,
  GET_FRIENDS,
  DELETE_FRIEND
} from './types';

// Get list of users, where user is not in a friend list
export const getPeopleList = (id) => dispatch => {
  axios
    .get(`http://localhost:3001/users/friends/search/${id}`)
    .then(res => 
      dispatch({
        type: GET_PEOPLE,
        payload: res.data.resp
      })
    );
};

// Get user friend list accepted/pending
export const getUserFriends = (id) => dispatch => {
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
  console.log('suveike?')
  axios
    .put(`http://localhost:3001/users/friends/add/${id}/${id2}`)
    .then(res => {
      dispatch(getUserFriends(id))
      dispatch(getPeopleList(id))}
    );
};

// Delete from friend list pending list request list
export const deleteFriend = (id, id2) => dispatch => {
  console.log('suveike?')
  axios
    .put(`http://localhost:3001/users/friends/delete/${id}/${id2}`)
    .then(res => {
      dispatch(getUserFriends(id))
      dispatch(getPeopleList(id))}
    );
};