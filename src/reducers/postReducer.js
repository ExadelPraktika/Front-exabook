import { ADD_POSTS, GET_FEED } from '../actions/types';

const initialState = {
    posts: [],
    post: {},
};
export default function(state = initialState, action) {
    switch(action.type) {
      case GET_FEED: 
        return {
          ...state,
          posts: action.payload,
        };
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        };
      default:
        return state;
    }
  }