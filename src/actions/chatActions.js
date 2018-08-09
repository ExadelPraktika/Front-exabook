import axios from 'axios';

import { 
    GET_CONVERSATIONS, 
    NEW_CONVERSATION, 
    LEAVE_CONVERSATION, 
    SEND_REPLY, 
    GET_PRIVATE_MESSAGES, 
    GET_CHANNEL_CONVERSATION, 
    POST_TO_CHANNEL 
} from './types';

export const newConversation = () => dispatch => {
  axios
    .post('http://localhost:3001/new')
    .then(res => 
      dispatch({
        type: NEW_CONVERSATION,
        payload: res.data
      })
    );
};

export const sendReply = replyData => dispatch => {
  axios
    .post('http://localhost:3001/reply', replyData)
    .then(res => 
      dispatch({
        type: SEND_REPLY,
        payload: res.data
      })
    );
};

export const postToChannel = () => dispatch => {
  axios
    .post(`http://localhost:3001/postchannel/${id}`)
    .then(res => 
      dispatch({
        type: POST_TO_CHANNEL,
        payload: res.data
      })
    );
};

export const leaveConversation = () => dispatch => {
  axios
    .post(`http://localhost:3001/leave`)
    .then(res => 
      dispatch({
        type: LEAVE_CONVERSATION,
        payload: res.data
      })
    );
};

export const getConversations = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get('http://localhost:3001/chat/')
    .then(res => 
      dispatch({
        type: GET_CONVERSATIONS,
        payload: res.data
      })
    );
};

export const getPrivateMessage = (id) => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`http://localhost:3001/privatemessages/${id}`)
    .then(res => 
      dispatch({
        type: GET_PRIVATE_MESSAGES,
        payload: res.data
      })
    );
};

export const getChannelConversations = (id) => dispatch => {
  axios
    .get(`http://localhost:3001/channel/${id}`)
    .then(res => 
      dispatch({
        type: GET_CHANNEL_CONVERSATION,
        payload: res.data,
        
      })
    )
};