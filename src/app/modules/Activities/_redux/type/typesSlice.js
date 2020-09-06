import { createSlice } from "@reduxjs/toolkit";

const initialTypesState = {
    listLoading: false,
    entities: null,
    lastError: null
};

export const callTypes = {
    list: "list",
};

export const typesSlice = createSlice({
    name: "types",
    initialState: initialTypesState,
    reducers: {
        typesLoaded: (state, action) => {
            const { entities } = action.payload;
            state.listLoading = false;
            state.error = null;
            state.entities = entities;
        },
    }
});
