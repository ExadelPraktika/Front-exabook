import {
  ADD_POST,
  GET_FEED,
  DELETE_POST,
  EDIT_POST,
  UPDATE_POST,
  UPDATE_POST_LIKES,
  ADD_POST_COMMENT,
  LIKE_POST_COMMENT,
  DELETE_POST_COMMENT,
  UPDATE_POST_COMMENTS
} from "../actions/types";

const initialState = {
  postFeed: [],
  post: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEED:
      return {
        postFeed: action.payload
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
        postFeed: action.payload
      };

    case UPDATE_POST:
      return state.postFeed.map(post => {
        if (post._id === action._id) {
          return {
            ...post,
            postBody: action.payload.newBody
          };
        } else return post;
      });

    case UPDATE_POST_LIKES:
      return {
        postFeed: action.payload
      };
    case ADD_POST_COMMENT:
      return {
        postFeed: action.payload
      };
    case LIKE_POST_COMMENT:
      return {
        postFeed: action.payload
      };
    case DELETE_POST_COMMENT:
      return {
        postFeed: action.payload
      };

    case UPDATE_POST_COMMENTS:
      return {
        postFeed: action.payload
      };
    default:
      return state;
  }
}
