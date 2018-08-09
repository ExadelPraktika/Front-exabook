import { GET_PEOPLE, SEND_REQUEST, GET_FRIENDS, FRIEND_LOADING, DELETE_FRIEND } from '../actions/types';

const initialState = {
  friends: [],
  friend: {},
  requestedFriends: [],
  friendRequests: [],
  userList: [],
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FRIEND_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PEOPLE: 
      return {
        ...state,
        userList: action.payload,
        loading: false
      };
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload.filter(friend => friend.status === 'accepted'),
        requestedFriends: action.payload.filter(friend => friend.status === 'requested'),
        friendRequests: action.payload.filter(friend => friend.status === 'pending'),
        loading: false
      };
    case DELETE_FRIEND:
      return {
      };
    default:
      return state;
  }
}