import axios from 'axios';

import {
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_FEED,
    FEED_LOADING
} from './types';

//Add post
export const addPost = postData => dispatch => {
  axios
    .post('http://localhost:3001/posts/', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    })
  );
};

//Get feed
export const getFeed = () => dispatch => {
  dispatch(setFeedLoading());
  console.log('suveike get feed')
  axios
    .get('http://localhost:3001/posts/')
    .then(res => {
      //console.log(res.data);
      dispatch({
        type: GET_FEED,
        payload: res.data
    })
    }
      
  );
}

//DELETE POST
export const deletePost = (id, idas) => dispatch => {
  console.log('daejo');
  axios
    .delete(`http://localhost:3001/posts/${id}/${idas}/`)
    .then(res => 
      dispatch({
        type: DELETE_POST,
        payload: idas
      })
    );
};

export const setFeedLoading = () => {
  return {
    type: FEED_LOADING
  };
};


