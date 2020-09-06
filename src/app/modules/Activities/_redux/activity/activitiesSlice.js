import { createSlice } from "@reduxjs/toolkit";

const initialActivitiesState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
    lastError: null
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const activitiesSlice = createSlice({
    name: "activities",
    initialState: initialActivitiesState,
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
        // findActivities
        activitiesFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
        },
        //createActivity
        activityCreated: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
            state.entities.push(action.payload.customer);
        },
    }
});
