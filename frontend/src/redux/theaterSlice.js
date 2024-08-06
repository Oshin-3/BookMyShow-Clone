import { createSlice } from "@reduxjs/toolkit";

const theaterSlice = createSlice({
    name: 'theater',
    initialState: {
        theaters: {}
    },
    reducers: {
        setTheaters: (state, action) => {
            console.log("theater action payload-> ",action.payload)
            state.theaters = action.payload
        }
    }
})

export const { setTheaters } = theaterSlice.actions
export default theaterSlice.reducer