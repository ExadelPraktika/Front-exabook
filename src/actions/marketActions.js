import axios from 'axios';

import {
  CREATE_POST,
  GET_MARKET_POSTS,
  GET_MARKET_POST,
  GET_SEARCHED_POSTS,
  GET_USER_POSTS
} from './types';

// Get market
export const getMarketPosts = () => dispatch => {
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
  axios
    .post('http://localhost:3001/marketplace/search', postData)
    .then(res =>
      dispatch({
        type: GET_SEARCHED_POSTS,
        payload: res.data
      })
    );
};

//Get users market
export const getuserEvents = (id) => dispatch => {
  console.log('suveike get user');
  axios
    .get(`http://localhost:3001/marketplace/my/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER_POSTS,
        payload: res.data
      })
    );
};

// Get single post
export const getMarketPost = (id) => dispatch => {
  axios
    .get(`http://localhost:3001/marketplace/${id}`)
    .then(res =>
      dispatch({
        type: GET_MARKET_POST,
        payload: res.data
      })
    );
};

// Add market post
export const createPost = postData => dispatch => {
    axios
        .post('http://localhost:3001/marketplace/', postData)
        .then(res =>
            dispatch({
                type: CREATE_POST,
                payload: res.data
            })
        );
};
// Get marketplace posts
export const getMarketplacePosts = () => dispatch => {
  axios
    .get('http://localhost:3001/marketplace/')
    .then(res =>
      dispatch({
        type: GET_MARKET_POSTS,
        payload: res.data
      })
    );
};


