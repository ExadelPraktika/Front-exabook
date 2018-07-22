import {CREATE_POST, GET_MARKET_POSTS, MARKET_LOADING} from '../actions/types';

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
        default:
            return state;
    }
}
