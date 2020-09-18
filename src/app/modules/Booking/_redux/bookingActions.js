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

export const updateBooking = (id, status, note) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateBooking(id, status,note)
        .then(() => {
            dispatch(actions.bookingUpdated({}));
        })
        .catch(error => {
            error.clientMessage = "Can't update booking";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const updateBookings = (ids, status, activityId) => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .updateBookings(ids, status, activityId)
        .then(() => {
            dispatch(actions.bookingsUpdated({}));
        })
        .catch(error => {
            error.clientMessage = "Can't update all bookings";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};


