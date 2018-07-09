import { TEST_DISPATCH } from './types';

// Register User
export const registerUser = (userToken) => {
  return {
    type: TEST_DISPATCH,
    payload: userToken
  };
};