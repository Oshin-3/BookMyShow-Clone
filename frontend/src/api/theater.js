import { axiosInstance } from ".";

export const AddTheaters = async (values) => {
    try {
        //console.log("api value => ", values)
        const res = await axiosInstance.post('/api/theaters/add-theater', values)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const UpdateTheaters = async (values) => {
    try {
        console.log("api value ", values)
        const res = await axiosInstance.put('/api/theaters/update-theater', values)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const DeleteTheater = async (theaterId) => {
    try {
        console.log("api theaterid : ", theaterId)
        const res = await axiosInstance.delete(`/api/theaters/delete-theater/${theaterId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetAllTheaters = async () => {
    try {
        const res = await axiosInstance.get('/api/theaters/get-all-theaters')
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetAllTheatersByOwner = async (ownerId) => {
    try {
        //console.log("api owner id -> ", ownerId)
        const res = await axiosInstance.get(`/api/theaters/get-all-theaters-by-id/${ownerId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}