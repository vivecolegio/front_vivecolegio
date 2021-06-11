import { BREADCRUMB_ACTIVE } from './types/breadcrumbTypes';

const INITIAL_STATE = {
  breadcrumb: [] as any,
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case BREADCRUMB_ACTIVE:
      return {
        ...state,
        breadcrumb: action.payload,
      };
    default:
      return state;
  }
};