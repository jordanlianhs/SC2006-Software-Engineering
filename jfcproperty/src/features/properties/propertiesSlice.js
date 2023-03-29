import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    streetName: "",
    blockNumber: "",
    flatType: "",
    length: 0,
};

export const propertiesSlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        addStreetName: (state, action) => {
            state.streetName = action.payload;
        },
        addBlockNumber: (state, action) => {
            state.blockNumber = action.payload;
        },
        addFlatType: (state, action) => {
            state.flatType = action.payload;
        },
    },
});

export const {
    addStreetName,
    addBlockNumber,
    addFlatType,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
