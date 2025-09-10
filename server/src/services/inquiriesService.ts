import * as inquiries from '../db/operations/inquiries-operation'
import { inquiry } from '../models/inquiries';

class inquiriesService {
    async getInquiries() {
        try {
            const allInquiries = await inquiries.getInquiries();
            return allInquiries;
        } catch (error) {
            throw new Error(`Failed to get inquiries: ${error}`);
        }
    }

    async createInquiry(inquiry: inquiry) {
        try {
            const newInquiry = await inquiries.createInquiry(inquiry);
            return newInquiry;
        } catch (error) {
            throw new Error(`Failed to create inquiry: ${error}`);
        }
    }
}

export default new inquiriesService();