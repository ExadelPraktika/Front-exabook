import axios from 'axios';

import {
  CREATE_POST,
  GET_MARKET_POSTS,
  GET_SEARCHED_POSTS,
  GET_USER_POSTS,
  DELETE_MARKET_POST,
  UPDATE_MARKET_COMMENTS,
  UPDATE_MARKET_LIKES,
  UPDATE_MARKET_RATES,
  ADD_MARKET_COMMENT,
  DELETE_MARKET_COMMENT,
  LIKE_MARKET_COMMENT, BUYING_ITEM
} from './types';
import {refreshUser} from "./authActions";

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
export const updateComments = postData => dispatch => {
  console.log('updating comments');
  axios
    .post('http://localhost:3001/marketplace/update/comments', postData)
    .then(res =>
      dispatch({
        type: UPDATE_MARKET_COMMENTS,
        payload: res.data
      })
    );
};

// Update market post
export const updateLikes = postData => dispatch => {
  console.log('updating likes');
  axios
    .post('http://localhost:3001/marketplace/update/likes', postData)
    .then(res =>
      dispatch({
        type: UPDATE_MARKET_LIKES,
        payload: res.data
      })
    );
};

// Update market post
export const updateRates = postData => dispatch => {
  console.log('updating rates');
  axios
    .post('http://localhost:3001/marketplace/update/rating', postData)
    .then(res =>
      dispatch({
        type: UPDATE_MARKET_RATES,
        payload: res.data
      })
    );
};

// Get users market
export const getUserPosts = postData => dispatch => {
  console.log('got user posts');
  axios
    .post(`http://localhost:3001/marketplace/myPosts`, postData)
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
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data
      });
      dispatch(getMarketPosts());
    }
    );
};

// Add market comment
export const addComment = postData => dispatch => {
  console.log('created a new comment');
  axios
    .post('http://localhost:3001/marketplace/comment', postData)
    .then(res =>
      dispatch({
        type: ADD_MARKET_COMMENT,
        payload: res.data
      })
    );
};

// Delete market comment
export const likeComment = postData => dispatch => {
  console.log('liked/unliked a comment');
  axios
    .post('http://localhost:3001/marketplace/like/comment', postData)
    .then(res =>
      dispatch({
        type: LIKE_MARKET_COMMENT,
        payload: res.data
      })
    );
};

// Delete market comment
export const deleteComment = postData => dispatch => {
  console.log('deleted a comment');
  axios
    .post('http://localhost:3001/marketplace/delete/comment', postData)
    .then(res =>
      dispatch({
        type: DELETE_MARKET_COMMENT,
        payload: res.data
      })
    );
};

// Delete market post
export const deletePost = (userId, postId) => dispatch => {
  console.log('deleting post');
  axios
    .delete(`http://localhost:3001/marketplace/delete/${postId}`, {data: { userId: userId }})
    .then(res => {
      dispatch({
        type: DELETE_MARKET_POST,
        payload: postId
      });
      dispatch(refreshUser(userId));
    });
};

// Delete market post
export const buyingItem = (buyer, seller, postId) => dispatch => {
  console.log(`buying item with id ${postId} from ${seller.name}`);
  axios
    .post(`http://localhost:3001/marketplace/buying/${postId}`, { buyer: buyer, seller: seller })
    .then(res => {
      dispatch({
        type: BUYING_ITEM,
        payload: postId
      });
      dispatch(refreshUser(buyer._id));
    });
};


