import {combineReducers} from "redux";

import { userSlice } from '../app/modules/User/_redux/userSlice';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export function* rootSaga() {
 
}
