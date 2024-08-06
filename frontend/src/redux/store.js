import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import loaderReducer from './loaderSlice'
import movieReducer from "./movieSlice";
import theaterReducer from "./theaterSlice";

const store = configureStore({
    reducer: {
        users: userReducer,
        loaders: loaderReducer,
        movies: movieReducer,
        theaters: theaterReducer
    }
})

export default store