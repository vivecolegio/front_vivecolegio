import { LOGOUT, LOGIN, ME } from './types/loginTypes';

const INITIAL_STATE = {
  userId: '',
  role: {},
  roleMenus: {},
  name: '',
  campus: '',
  school: '',
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        role: action.payload.role,
        roleMenus: action.payload.roleMenus,
        name: action.payload.name,
        campus: action.payload.campus,
        school: action.payload.school,
      };
    case ME:
      return {
        ...state,      
        roleMenus: action.payload.roleMenus,        
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