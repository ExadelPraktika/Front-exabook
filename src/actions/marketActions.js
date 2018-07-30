import axios from 'axios';

import {
  CREATE_POST,
  GET_MARKET_POSTS,
  GET_SEARCHED_POSTS,
  GET_USER_POSTS,
  DELETE_MARKET_POST,
  UPDATE_POST
} from './types';

// Get market
export const getMarketPosts = () => dispatch => {
  console.log('got market posts');
  axios
    .get('http://localhost:3001/marketplace/')
    .then(res =>
      dispatch({
        type: GET_MARKET_POSTS,
        payload: res.data
      })
    );
};

// Get market
export const getSearchedPosts = postData => dispatch => {
  console.log('searching for posts');
  axios
    .post('http://localhost:3001/marketplace/search', postData)
    .then(res =>
      dispatch({
        type: GET_SEARCHED_POSTS,
        payload: res.data
      })
    );
};

// Update market post
export const update = postData => dispatch => {
  console.log('updating post');
  axios
    .post('http://localhost:3001/marketplace/update', postData)
    .then(res =>
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
    );
};

// Get users market
export const getUserPosts = (id) => dispatch => {
  console.log('got user posts');
  axios
    .get(`http://localhost:3001/marketplace/my/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_POSTS,
        payload: res.data
      })
    );
};

// Add market post
export const createPost = postData => dispatch => {
  console.log('created a new post');
  axios
    .post('http://localhost:3001/marketplace/', postData)
    .then(res =>
      dispatch({
        type: CREATE_POST,
        payload: res.data
      })
    );
};

// Delete market post
export const deletePost = (userId, postId) => dispatch => {
  console.log('deleting post');
  axios
    .delete(`http://localhost:3001/marketplace/${userId}/${postId}`)
    .then(res =>
      dispatch({
        type: DELETE_MARKET_POST,
        payload: postId
      })
    );
};


