import { LOGOUT, LOGIN } from './types/loginTypes';

const INITIAL_STATE = {
  userId: '',
  role: {},
  roleMenus: {},
  name: '',
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN:
      console.log(action, 'ACTION')
      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.role,
        roleMenus: action.payload.roleMenus,
        name: action.payload.name,
      };
    case LOGOUT:
      return {
        ...state,
        userId: '',
        role: {},
        roleMenus : [],
        name: '',
      };
    default:
      return state;
  }
};