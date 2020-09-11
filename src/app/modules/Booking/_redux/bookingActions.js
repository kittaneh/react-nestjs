import * as requestFromServer from "./bookingCrud";
import { bookingSlice, callTypes } from "./bookingSlice";

const { actions } = bookingSlice;

export const fetchBookings = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .findBookings(queryParams)
        .then(response => {
            const { data } = response;
            dispatch(actions.bookingFetched({ totalCount: data.length, entities: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't find booking";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};

