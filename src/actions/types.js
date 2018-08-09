//ERROR ACTIONS
export const GET_ERRORS = 'GET_ERRORS';

//AUTH ACTIONS
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

//MARKET ACTIONS
export const CREATE_POST = 'CREATE_POST';
export const GET_MARKET_POSTS = 'GET_MARKET_POSTS';
export const GET_SEARCHED_POSTS = 'GET_SEARCHED_POSTS';
export const GET_USER_POSTS = 'GET_USER_POSTS';
export const DELETE_MARKET_POST = 'DELETE_MARKET_POST';
export const UPDATE_MARKET_COMMENTS = 'UPDATE_MARKET_COMMENTS';
export const UPDATE_MARKET_LIKES = 'UPDATE_MARKET_LIKES';
export const UPDATE_MARKET_RATES = 'UPDATE_MARKET_RATES';

//EVENT ACTIONS
export const EVENT_LOADING = 'EVENT_LOADING';
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT = 'GET_EVENT';
export const GET_USER_EVENTS = 'GET_USER_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const GOING_EVENT = 'GOING_EVENT';
export const UNGOING_EVENT = 'UNGOING_EVENT';

//FRIENDS ACTIONS
export const FRIEND_LOADING = 'FRIEND_LOADING';
export const GET_PEOPLE = 'GET_PEOPLE';
export const GET_FRIENDS = 'GET_FRIENDS';
export const SEND_REQUEST = 'SEND_REQUEST';
export const DELETE_FRIEND = 'DELETE_FRIEND';

//FEED ACTIONS
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_FEED = 'GET_FEED';
export const FEED_LOADING = 'FEED_LOADING';
export const EDIT_POST = 'EDIT_POST';
export const UPDATE_POST = 'UPDATE_POST';

//FILTER ACTIONS
export const ON_FILTER_OPEN_CHANGED = 'filters@ON_FILTER_OPEN_CHANGED'
export const ON_FILTER_SORT_FIELD_CHANGED = 'filters@ON_FILTER_SORT_FIELD_CHANGED'
export const ON_FILTER_SORT_ORIENTATION_CHANGED = 'filters@ON_FILTER_SORT_ORIENTATION_CHANGED'
export const ON_ADD_FILTER_QUERY = 'filters@ON_ADD_FILTER_QUERY'
export const ON_EDIT_FILTER_QUERY = 'filters@ON_EDIT_FILTER_QUERY'
export const ON_REMOVE_FILTER_QUERY = 'filters@ON_REMOVE_FILTER_QUERY'
export const ON_SET_SEARCH = 'filters@ON_SET_SEARCH'

//CHAT ACTIONS
export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const NEW_CONVERSATION = 'NEW_CONVERSATION';
export const LEAVE_CONVERSATION = 'LEAVE_CONVERSATION';
export const SEND_REPLY = 'SEND_REPLY';
export const GET_PRIVATE_MESSAGES = 'GET_PRIVATE_MESSAGES';
export const GET_CHANNEL_CONVERSATION = 'GET_CHANNEL_CONVERSATION';
export const POST_TO_CHANNEL = 'POST_TO_CHANNEL';