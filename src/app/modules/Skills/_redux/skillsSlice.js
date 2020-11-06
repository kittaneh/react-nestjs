import { createSlice } from "@reduxjs/toolkit";

const initialSkillsState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: null,
};
export const callTypes = {
    list: "list",
    action: "action"
};

export const skillsSlice = createSlice({
    name: "skills",
    initialState: initialSkillsState,
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
        skillsFetched: (state, action) => {
            const { totalCount, entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
            state.totalCount = totalCount;
        },
        skillsAdded: (state, action) => {
            state.actionsLoading = false;
            state.error = null;
            //const { ids, status } = action.payload;
            // state.entities = state.entities.map(entity => {
            //     if (ids.findIndex(id => id === entity.id) > -1) {
            //         entity.status = status;
            //     }
            //     return entity;
            // });
        }
    }
});
