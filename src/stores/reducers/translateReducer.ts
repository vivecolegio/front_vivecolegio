import { TRANSLATE } from './types/translateTypes';

const INITIAL_STATE = { language: 'en' as any };

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TRANSLATE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};