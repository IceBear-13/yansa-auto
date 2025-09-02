import axios from "axios";

const API_URL = import.meta.env.BACKEND_URL || 'http://localhost:3000'

export const login = async (usernameOrEmail:string, password: string) => {
    const user = await axios.post(
        `${API_URL}/api/auth/login`, {
            data: {
                usernameOrEmail,
                password
            }
    })

    return user.data;
}

export const register = async (username: string, email: string, password: string, phoneNumber: string) => {
    const user = await axios.post(
        `${API_URL}/api/auth/register`, {
            data: {
                username,
                email,
                password,
                phoneNumber
            }
    })

    return user.data;
}

export const authenticate = async (token: string) => {
    const user = await axios.post(
        `${API_URL}/api/auth/authenticate`, {
            data: {
                token
            }
    })

    return user.data;
}