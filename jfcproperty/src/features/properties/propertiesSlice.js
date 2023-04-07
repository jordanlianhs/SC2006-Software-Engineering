import { createSlice } from "@reduxjs/toolkit";

export const selectFlatType = (state) => state.properties.flatType;
export const selectStreetName = (state) => state.properties.streetName;
export const selectBlockNumber = (state) => state.properties.blockNumber;
//added selectTown and selectFlatModel
export const selectTown = (state) => state.properties.Town;
export const selectFlatModel = (state) => state.properties.flatModel;
export const selectFilteredFlats = (state) => state.properties.filteredFlats;

const initialState = {
    streetName: "",
    blockNumber: "",
    flatType: "",
    Town:"",
    flatModel:"",
    filteredFlats: [], // Add filteredFlats to your initialState
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
        addTown: (state, action) => {
            state.Town = action.payload;
        },
        addFlatModel: (state, action) => {
            state.flatModel = action.payload;
        },
        // Define the storeFilteredFlats action
        storeFilteredFlats: (state, action) => {
        state.filteredFlats = action.payload;
      },
    },
});

export const {
    addStreetName,
    addBlockNumber,
    addFlatType, 
    addTown,
    addFlatModel,storeFilteredFlats
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
