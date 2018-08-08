import { GET_CONVERSATIONS, NEW_CONVERSATION, LEAVE_CONVERSATION, SEND_REPLY, GET_PRIVATE_MESSAGES, GET_CHANNEL_CONVERSATION, POST_TO_CHANNEL } from '../actions/types';

const initialState = {
  conversations: [],
  privateMessages: [],
  reply: [],
  channels: [],
  channelPosts: [],
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case NEW_CONVERSATION:
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        loading: false
      };
    case GET_CONVERSATIONS: 
      return {
        ...state,
        conversations: action.payload,
        loading: false
      };
    case GET_PRIVATE_MESSAGES:
      return {
        ...state,
        privateMessages: action.payload,
        loading: false
      };
    case SEND_REPLY:
      return {
        ...state,
        reply: action.payload,
        loading: false
      };
    case LEAVE_CONVERSATION:
      return {
        ...state,
        conversations: [action.payload, ...state.conversations]
      };
    case GET_CHANNEL_CONVERSATION:
      return {
        ...state,
        channels: action.payload,
        loading: false
      }; 
    case POST_TO_CHANNEL:
      return {
        ...state,
        channelPosts: [action.payload, ...state.channelPosts]
      };
    default:
      return state;
  }
}