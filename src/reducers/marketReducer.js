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
  LIKE_MARKET_COMMENT, BUYING_ITEM
} from '../actions/types';

const initialState = {
    marketFeed: [],
};

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_POST:
            return {
                marketFeed: [action.payload, ...state.marketFeed]
            };
        case GET_MARKET_POSTS:
            return {
                marketFeed: action.payload
            };
        case GET_SEARCHED_POSTS:
            return {
                marketFeed: action.payload
            };
        case GET_USER_POSTS:
            return {
                marketFeed: action.payload
            };
        case DELETE_MARKET_POST:
            return {
              marketFeed: state.marketFeed.filter(post => post._id !== action.payload)
            };
      case BUYING_ITEM:
          return {
            ...state
          };
        case UPDATE_MARKET_RATES:
          return {
            marketFeed: action.payload
          };
        case UPDATE_MARKET_LIKES:
          return {
            marketFeed: action.payload
          };
        case UPDATE_MARKET_COMMENTS:
          return {
            marketFeed: action.payload
          };
        case ADD_MARKET_COMMENT:
          return {
            marketFeed: action.payload
          };
        case DELETE_MARKET_COMMENT:
          return {
            marketFeed: action.payload
          };
        case LIKE_MARKET_COMMENT:
          return {
            marketFeed: action.payload
          };
        default:
            return state;
    }
}
