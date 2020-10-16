import { createSlice } from "@reduxjs/toolkit";

const initialCalendarState = {
    listLoading: false,
    actionsLoading: false,
    events: null,
    error: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: initialCalendarState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },
        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },
        // findEvents
        eventsFetched: (state, action) => {
            const events = action.payload;
            state.listLoading = false;
            state.error = null;
            state.events = events;
        }
    }
});
