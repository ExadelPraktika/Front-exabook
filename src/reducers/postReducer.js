import { ADD_POST, GET_FEED, FEED_LOADING, DELETE_POST, EDIT_POST, UPDATE_POST } from '../actions/types';

const initialState = {
    postFeed: [],
    post: {},
    loading: false
};
export default function(state = initialState, action) {
    switch(action.type) {
      case FEED_LOADING:
      return {
        ...state,
        loading: true
      };
      case GET_FEED: 
        return {
          ...state,
          postFeed: action.payload,
        };
      case ADD_POST:
        return {
          ...state,
          postFeed: [action.payload, ...state.postFeed]
        };
      case DELETE_POST:
        return {
          ...state,
          postFeed: state.postFeed.filter(post => post._id !== action.payload)
        };
      case EDIT_POST:
        return {
          ...state,
          postFeed: state.postFeed.map((post)=>post._id === action._id ? {...post, editing:!post.editing}:post)
        };

      case 'UPDATE_POST':
        return state.postFeed.map((post)=>{
          if(post._id === action._id) {
            return {
                ...post,
                postBody: action.payload.newBody,
                editing: !post.editing
            }
          } else return post;
      });
      default:
        return state;
    }
  }