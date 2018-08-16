import axios from "axios";

import {
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_FEED,
  FEED_LOADING,
  EDIT_POST,
  LIKE_POST,
  UNLIKE_POST
} from "./types";

//ADD POST
export const addPost = postData => dispatch => {
  console.log(postData);
  axios.post("http://localhost:3001/posts/", postData).then(res =>
    dispatch({
      type: ADD_POST,
      payload: res.data
    })
  );
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
  dispatch(setFeedLoading());
  console.log("suveike get feed");
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
export const editPost = (id, postData) => dispatch => {
  console.log(id, postData);
  axios.post(`http://localhost:3001/posts/edit/${id}/`, postData).then(res =>
    dispatch({
      type: EDIT_POST,
      payload: res.data
    })
  );
};

// Add user to going list
export const likePost = (id, idas, l) => dispatch => {
  if (!l) {
    axios
      .post(`http://localhost:3001/posts/like/${id}/${idas}`)
      .then(res => dispatch(getEvents()));
  } else {
    axios
      .post(`http://localhost:3001/posts/like/${id}/${idas}`)
      .then(res => dispatch(getEvent(idas)));
  }
};

export const unlikePost = (id, idas, l) => dispatch => {
  if (!l) {
    axios
      .post(`http://localhost:3001/posts/unlike/${id}/${idas}`)
      .then(res => dispatch(getEvents()));
  } else {
    axios
      .post(`http://localhost:3001/posts/unlike/${id}/${idas}`)
      .then(res => dispatch(getEvent(idas)));
  }
};

export const addComment = (eventID, commentData) => dispatch => {
  console.log(commentData);
  axios
    .post(`http://localhost:3001/posts/comment/${eventID}`, commentData)
    .then(res => dispatch(getPost(eventID)));
};

export const setFeedLoading = () => {
  return {
    type: FEED_LOADING
  };
};
