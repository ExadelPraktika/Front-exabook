import axios from 'axios';

import {
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_FEED,
    FEED_LOADING,
    EDIT_POST
} from './types';

//ADD POST
export const addPost = postData => dispatch => {
  axios
    .post('http://localhost:3001/posts/', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    })
  );
};

export const getPost = (id) => dispatch => {
  axios
    .get(`http://localhost:3001/posts/${id}`)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data,
        
      })
    )
};

//GET FEED
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
export const deletePost = (id) => dispatch => {
  axios
    .get(`http://localhost:3001/posts/delete/${id}/`)
    .then(res => 
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    );
};

//EDIT POST
export const editPost = (id) => dispatch => {
  axios
    .post(`http://localhost:3001/posts/edit/${id}/`)
    .then(res => 
      dispatch({
        type: EDIT_POST,
        payload: id
      })
    );
};

export const setFeedLoading = () => {
  return {
    type: FEED_LOADING
  };
};


