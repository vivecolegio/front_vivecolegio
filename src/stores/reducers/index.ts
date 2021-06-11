import { combineReducers } from "redux";
import { RESET_APP } from "./types/loginTypes";
import loginReducer from './loginReducer';
import translateReducer from './translateReducer';
import breadcrumbReducer from './breadcrumbReducer';
import notificationReducer from './notificationReducer';

export const appReducer = combineReducers({
    loginReducer,
    translateReducer,
    breadcrumbReducer,
    notificationReducer,
})

export const rootReducer = (state:any, action: any) =>{
    if(action.type === RESET_APP){
        state = undefined;
    }
    return appReducer(state, action)
}