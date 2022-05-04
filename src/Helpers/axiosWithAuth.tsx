import axios from 'axios'

// This is the axios instance that will be used in the application

// will update it with authentication
export const axiosWithAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
