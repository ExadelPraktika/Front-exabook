import axios from 'axios';

import {
  ADD_EVENT,
  GET_EVENTS,
  GET_EVENT,
  EVENT_LOADING,
  DELETE_EVENT,
  GET_USER_EVENTS,
  GOING_EVENT,
  UNGOING_EVENT
} from './types';

// Add event
export const addEvent = eventData => dispatch => {
  axios
    .post('http://localhost:3001/events/', eventData)
    .then(res => 
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      })
    );
};

// Get events
export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get('http://localhost:3001/events/')
    .then(res => 
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    );
};

//Get users events
export const getuserEvents = (id) => dispatch => {
  console.log('suveike get user');
  dispatch(setEventLoading());
  axios
    .get(`http://localhost:3001/events/my/${id}`)
    .then(res => 
      dispatch({
        type: GET_USER_EVENTS,
        payload: res.data
      })
    );
};

// Get single event
export const getEvent = (id) => dispatch => {
  axios
    .get(`http://localhost:3001/events/${id}`)
    .then(res => 
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    );
};

// Delete posts
export const deleteEvent = (id, idas) => dispatch => {
  console.log('daejo');
  axios
    .delete(`http://localhost:3001/events/${id}/${idas}`)
    .then(res => 
      dispatch({
        type: DELETE_EVENT,
        payload: idas
      })
    );
};

// Add user to going list
export const goingEvent = (id, idas) => dispatch => {
  axios
    .post(`http://localhost:3001/events/going/${id}/${idas}`)
    .then(res => 
      dispatch(getEvents())
    );
};

export const ungoingEvent = (id, idas) => dispatch => {
  axios
    .post(`http://localhost:3001/events/ungoing/${id}/${idas}`)
    .then(res => 
      dispatch(getEvents())
    );
};

// Add comment
export const addComment = (eventID, commentData) => dispatch => {
  axios
    .post(`http://localhost:3001/events/comment/${eventID}`, commentData)
    .then(res => 
      dispatch(getEvent(eventID))
      // dispatch({
      //   type: GET_EVENT,
      //   payload: res.data,
      // })
    );
};

// Add comment
export const deleteComment = (eventID, commentID) => dispatch => {
  axios
    .delete(`http://localhost:3001/events/comment/${eventID}/${commentID}`)
    .then(res => 
      dispatch(getEvent(eventID))
      // dispatch({
      //   type: GET_EVENT,
      //   payload: res.data,
      // })
    );
};

export const addLike = (userID, eventID, commentID) => dispatch => {
  axios
    .post(`http://localhost:3001/events/comments/like/${userID}/${eventID}/${commentID}`)
    .then(res => 
      dispatch(getEvent(eventID))
      // dispatch({
      //   type: GET_EVENT,
      //   payload: res.data,
      // })
    );
};

export const deleteLike = (userID, eventID, commentID) => dispatch => {
  axios
    .post(`http://localhost:3001/events/comments/unlike/${userID}/${eventID}/${commentID}`)
    .then(res => 
      dispatch(getEvent(eventID))
      // dispatch({
      //   type: GET_EVENT,
      //   payload: res.data,
      // })
    );
};

//TODO KAD gauti my events tiesiog padaryti my events actiona dar viena ji ideti i switch ir paduoti funkcija su reiksme papildoma is selectiono tarp mano ar visu eventu
// Set loading state
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};