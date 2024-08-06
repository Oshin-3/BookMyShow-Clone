import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: ''
    },
    reducers: {
        setMovies: (state, action) => {
            console.log(action.payload.movie)
            state.movies = action.payload

        }
    }
})

export const { setMovies } = movieSlice.actions
export default movieSlice.reducer