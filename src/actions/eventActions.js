import axios from 'axios';

import {
  ADD_EVENT,
  GET_EVENTS,
  GET_EVENT,
  EVENT_LOADING,
  DELETE_EVENT,
  GET_USER_EVENTS,
  GET_ERRORS,
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
      }),
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
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
    .post(`http://localhost:3001/events/myEvents`, { id: id })
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
    .post(`http://localhost:3001/events/getEvent`, { id: id })
    .then(res => 
      dispatch({
        type: GET_EVENT,
        payload: res.data,
        
      })
    )
};

// Delete posts
export const deleteEvent = (id, idas) => dispatch => {
  console.log('daejo');
  axios
    .delete(`http://localhost:3001/events/${idas}`, {data: { id: id, idas: idas } })
    .then(res => 
      dispatch({
        type: DELETE_EVENT,
        payload: idas
      })
    );
};

// Add user to going list
export const goingEvent = (id, idas, l) => dispatch => {
  if(!l){
  axios
    .post(`http://localhost:3001/events/going/${idas}`, { idas: idas, id: id })
    .then(res => 
      dispatch(getEvents())
    );}else {
      axios
    .post(`http://localhost:3001/events/going/${idas}`, { idas: idas, id: id })
    .then(res => 
      dispatch(getEvent(idas))
    )
    }
};

export const ungoingEvent = (id, idas, l) => dispatch => {
  if(!l){
    axios
      .post(`http://localhost:3001/events/ungoing/${idas}`, { idas: idas, id: id })
      .then(res => 
        dispatch(getEvents())
      );}else {
        axios
      .post(`http://localhost:3001/events/ungoing/${idas}`, { idas: idas, id: id })
      .then(res => 
        dispatch(getEvent(idas))
      )
      }
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
    .post(`http://localhost:3001/events/comments/like/${eventID}/${commentID}`, { userID: userID, eventID: eventID, commentID: commentID })
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
    .post(`http://localhost:3001/events/comments/unlike/${eventID}/${commentID}` , { userID: userID, eventID: eventID, commentID: commentID })
    .then(res => 
      dispatch(getEvent(eventID))
      // dispatch({
      //   type: GET_EVENT,
      //   payload: res.data,
      // })
    );
};

// Set loading state
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};