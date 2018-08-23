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

export const updateComments = postData => dispatch => {
  axios
    .post('http://localhost:3001/marketplace/update/comments', postData)
    .then(res =>
      dispatch({
        type: UPDATE_MARKET_COMMENTS,
        payload: res.data
      })
    );
};

export const updateLikes = postData => dispatch => {
  axios
    .post('http://localhost:3001/marketplace/update/likes', postData)
    .then(res =>
      dispatch({
        type: UPDATE_MARKET_LIKES,
        payload: res.data
      })
    );
};

export const updateRates = postData => dispatch => {
  axios
    .post('http://localhost:3001/marketplace/update/rating', postData)
    .then(res =>
      dispatch({
        type: UPDATE_MARKET_RATES,
        payload: res.data
      })
    );
};

export const getUserPosts = postData => dispatch => {
  axios
    .post(`http://localhost:3001/marketplace/myPosts`, postData)
    .then(res =>
      dispatch({
        type: GET_USER_POSTS,
        payload: res.data
      })
    );
};

export const createPost = postData => dispatch => {
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

export const addComment = postData => dispatch => {
  axios
    .post('http://localhost:3001/marketplace/comment', postData)
    .then(res =>
      dispatch({
        type: ADD_MARKET_COMMENT,
        payload: res.data
      })
    );
};

export const likeComment = postData => dispatch => {
  axios
    .post('http://localhost:3001/marketplace/like/comment', postData)
    .then(res =>
      dispatch({
        type: LIKE_MARKET_COMMENT,
        payload: res.data
      })
    );
};

export const deleteComment = postData => dispatch => {
  axios
    .post('http://localhost:3001/marketplace/delete/comment', postData)
    .then(res =>
      dispatch({
        type: DELETE_MARKET_COMMENT,
        payload: res.data
      })
    );
};

export const deletePost = (userId, postId) => dispatch => {
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

export const buyingItem = (buyer, seller, postId) => dispatch => {
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


