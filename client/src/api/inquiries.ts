import axios from "axios";
import type { inquiry } from "../models/inquiries";

const API_URL = import.meta.env.BACKEND_ENDPOINT || 'http://localhost:3000';

export const submitInquiry = async (inquiry: inquiry): Promise<inquiry> => {
    const response = await axios.post(`${API_URL}/api/inquiries`, inquiry);
    return response.data;
}

export const fetchAllInquiries = async (): Promise<inquiry[]> => {
    const response = await axios.get(`${API_URL}/api/inquiries`);
    return response.data;
}