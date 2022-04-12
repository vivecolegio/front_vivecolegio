/* eslint-disable @typescript-eslint/default-param-last */
import { LOGOUT, LOGIN, ME } from './types/loginTypes';

const INITIAL_STATE = {
  userId: '',
  entityId: '',
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
        entityId: action.payload.entityId,
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
        entityId: '',
        role: {},
        roleMenus : [],
        name: '',
        campus: '',
        campusId: '',
        school: '',
        schoolId: '',        
      };
    default:
      return state;
  }
};