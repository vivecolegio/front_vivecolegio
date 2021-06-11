import {
    ERROR_NOTIFICATION,
    SUCCESS_NOTIFICATION,
  } from './types/notificationTypes';
  
  const INITIAL_STATE = {
    error: '',
    success: '',
  };
  
  export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case ERROR_NOTIFICATION:
        return {
          ...state,
          error: action.payload,
        };
      case SUCCESS_NOTIFICATION:
        return {
          ...state,
          success: action.payload,
        };
      default:
        return state;
    }
  };