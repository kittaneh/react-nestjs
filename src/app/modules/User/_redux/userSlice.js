import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
    userCreated: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
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
            state.entities = [];
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },
        usersFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
        },
        userCreated: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
            state.userCreated = true;
        },
    }
});
