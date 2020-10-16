import * as requestFromServer from "./calendarCrud";
import { calendarSlice, callTypes } from "./calendarSlice";

const { actions } = calendarSlice;

export const fetchEvents = queryParams => dispatch => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .findEvents(queryParams)
        .then(response => {
            const { data } = response;
            dispatch(actions.eventsFetched({ events: data }));
        })
        .catch(error => {
            error.clientMessage = "Can't find events";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};