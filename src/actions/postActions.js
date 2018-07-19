import axios from 'axios';

import {
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_FEED
} from './types';

//Add post
export const addPost = postData => dispatch => {
  axios
    .post('http://localhost:3001/posts', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    })
  );
};

//Get feed
export const getFeed = () => {
  axios
    .get('http://localhost:3001/posts/')
    .then(res =>
      dispatch({
        type: GET_FEED,
        payload: res.data
    })
  );
}


