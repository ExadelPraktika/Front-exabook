import axios from "axios";

import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_FEED,
  FEED_LOADING,
  EDIT_POST,
  UPDATE_POST_LIKES,
  ADD_POST_COMMENT,
  LIKE_POST_COMMENT,
  DELETE_POST_COMMENT
} from "./types";

//ADD POST
export const addPost = postData => dispatch => {
  console.log("post added");
  axios.post("http://localhost:3001/posts/", postData).then(res => {
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(getFeed());
  });
  //dispatch(getFeed());
};

export const getPost = id => dispatch => {
  axios.get(`http://localhost:3001/posts/${id}`).then(res =>
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  );
};

//GET FEED
export const getFeed = () => dispatch => {
  console.log("get feed call");
  axios.get("http://localhost:3001/posts/").then(res => {
    //console.log(res.data);
    dispatch({
      type: GET_FEED,
      payload: res.data
    });
  });
};

//DELETE POST
export const deletePost = id => dispatch => {
  axios.get(`http://localhost:3001/posts/delete/${id}/`).then(res =>
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  );
};

//EDIT POST
export const editPost = postData => dispatch => {
  console.log(postData);
  axios.post(`http://localhost:3001/posts/edit/`, postData).then(res =>
    dispatch({
      type: EDIT_POST,
      payload: res.data
    })
  );
};

export const likePost = postData => dispatch => {
  console.log("updating likes");
  axios.post("http://localhost:3001/posts/like", postData).then(res =>
    dispatch({
      type: UPDATE_POST_LIKES,
      payload: res.data
    })
  );
};

export const addComment = postData => dispatch => {
  console.log("created a new comment");
  axios.post("http://localhost:3001/posts/comment", postData).then(res =>
    dispatch({
      type: ADD_POST_COMMENT,
      payload: res.data
    })
  );
};

export const likeComment = postData => dispatch => {
  console.log("liked/unliked a comment");
  axios.post("http://localhost:3001/posts/comment/like", postData).then(res =>
    dispatch({
      type: LIKE_POST_COMMENT,
      payload: res.data
    })
  );
};

// Delete market comment
export const deleteComment = postData => dispatch => {
  console.log("deleted a comment");
  axios.post("http://localhost:3001/posts/comment/delete", postData).then(res =>
    dispatch({
      type: DELETE_POST_COMMENT,
      payload: res.data
    })
  );
};

export const setFeedLoading = () => {
  return {
    type: FEED_LOADING
  };
};
