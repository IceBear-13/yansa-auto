import axios from "axios";

const API_URL = import.meta.env.BACKEND_URL || 'http://localhost:3000'

export const login = async (usernameOrEmail:string, password: string) => {
    const user = await axios.post(
        `${API_URL}/api/auth/login`, 
        {
            usernameOrEmail,
            password
        }
    )

    return user.data;
}

export const register = async (username: string, email: string, password: string, phoneNumber: string) => {
    const user = await axios.post(
        `${API_URL}/api/auth/register`, 
        {
            username: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        }
    )

    return user.data;
}

export const authenticate = async (token: string) => {
    try{
        const user = await axios.get(
        `${API_URL}/api/auth/authenticate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return user.data;

    } catch (error) {
        console.error("Error authenticating user:", error);
        return { status: 401, message: "Unauthorized" };
    }
}