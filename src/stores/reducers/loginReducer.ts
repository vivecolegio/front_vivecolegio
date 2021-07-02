import { LOGOUT, LOGIN } from './types/loginTypes';

const INITIAL_STATE = {
  userId: '',
  role: {},
  name: '',
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.role,
        name: action.payload.name,
      };
    case LOGOUT:
      return {
        ...state,
        userId: '',
        role: {},
        name: '',
      };
    default:
      return state;
  }
};