import { LOGOUT, SIGNIN } from './types/loginTypes';

const INITIAL_STATE = {
  user: { username: '' },
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};