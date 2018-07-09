import { TEST_DISPATCH } from './types';

// Register User
export const setCurrent = (userToken) => {
  return {
    type: TEST_DISPATCH,
    payload: userToken
  };
};