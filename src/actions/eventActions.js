import axios from 'axios';

import {
  ADD_EVENT,
  GET_EVENTS,
  EVENT_LOADING
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

// Set loading state
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};