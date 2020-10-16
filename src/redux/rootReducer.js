import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { activitiesSlice } from "../app/modules/Activities/_redux/activity/activitiesSlice";
import { typesSlice } from "../app/modules/Activities/_redux/type/typesSlice";
import { bookingSlice } from '../app/modules/Booking/_redux/bookingSlice';
import { calendarSlice } from '../app/modules/Calendar/_redux/calendarSlice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  activities:activitiesSlice.reducer,
  types:typesSlice.reducer,
  booking:bookingSlice.reducer,
  calendar:calendarSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
