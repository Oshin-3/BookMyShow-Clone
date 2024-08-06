import axios from 'axios'

export const axiosInstance = axios.create({
    headers: {
        baseURL: "http://localhost:8082",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
})