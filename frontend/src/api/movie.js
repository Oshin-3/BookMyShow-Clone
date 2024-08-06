import { axiosInstance } from "./index";

export const GetAllMovies = async (value) => {
    try {
        const response = await axiosInstance.get('/api/movies/get-all-movies', value)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const AddMovies = async (value) => {
    try {
        const response = await axiosInstance.post('/api/movies/add-movie', value)
        return response.data
    } catch (error) {
        console.log("Error while calling addMovie API ", error)
    }
} 

export const UpdateMovie = async (value) => {
    try {
        
        const response = await axiosInstance.put('/api/movies/update-movie', value)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const DeleteMovie = async (value) => {
    try {
        console.log("delete movie value-> ", value)
        const response = await axiosInstance.post('/api/movies/delete-movie', value)
        return response.data
    } catch (error) {
        console.log(error)
    }
}