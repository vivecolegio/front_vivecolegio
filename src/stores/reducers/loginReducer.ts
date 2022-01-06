import { LOGOUT, LOGIN, ME } from './types/loginTypes';

const INITIAL_STATE = {
  userId: '',
  role: {},
  roleMenus: {},
  name: '',
  campus: '',
  campusId: '',
  school: '',
  schoolId: '',
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
        campusId: action.payload.campusId,
        school: action.payload.school,
        schoolId: action.payload.schoolId,
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
        campus: '',
        campusId: '',
        school: '',
        schoolId: ''
      };
    default:
      return state;
  }
};