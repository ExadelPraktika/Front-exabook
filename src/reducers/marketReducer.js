import {
  ADD_MARKET_COMMENT,
  CREATE_POST,
  DELETE_MARKET_POST,
  GET_MARKET_POSTS,
  GET_SEARCHED_POSTS,
  GET_USER_POSTS,
  UPDATE_MARKET_COMMENTS,
  UPDATE_MARKET_LIKES,
  UPDATE_MARKET_RATES,
  DELETE_MARKET_COMMENT,
  LIKE_MARKET_COMMENT
} from '../actions/types';

const initialState = {
    marketFeed: [],
    post: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_POST:
            return {
                ...state,
                marketFeed: [action.payload, ...state.marketFeed]
            };
        case GET_MARKET_POSTS:
            return {
                ...state,
                marketFeed: action.payload
            };
        case GET_SEARCHED_POSTS:
            return {
                ...state,
                marketFeed: action.payload
            };
        case GET_USER_POSTS:
            return {
                ...state,
                marketFeed: action.payload
            };
        case DELETE_MARKET_POST:
            return {
              ...state,
              marketFeed: state.marketFeed.filter(post => post._id !== action.payload)
            };
        case UPDATE_MARKET_RATES:
          return {
            ...state,
            marketFeed: action.payload
          };
        case UPDATE_MARKET_LIKES:
          return {
            ...state,
            marketFeed: action.payload
          };
        case UPDATE_MARKET_COMMENTS:
          return {
            ...state,
            marketFeed: action.payload
          };
        case ADD_MARKET_COMMENT:
          return {
            ...state,
            marketFeed: action.payload
          };
        case DELETE_MARKET_COMMENT:
          return {
            ...state,
            marketFeed: action.payload
          };
        case LIKE_MARKET_COMMENT:
          return {
            ...state,
            marketFeed: action.payload
          };
        default:
            return state;
    }
}
