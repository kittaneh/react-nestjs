import { createSlice } from "@reduxjs/toolkit";

const initialBookingState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const bookingSlice = createSlice({
    name: "booking",
    initialState: initialBookingState,
    reducers: {
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`;
            state.activityCreated = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },
        startCall: (state, action) => {
            state.error = null;
            state.activityCreated = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },
        bookingFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
        },
    }
});
