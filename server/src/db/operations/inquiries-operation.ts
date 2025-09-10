import { inquiries } from "../schema/inquiries"
import { db } from "../db";
import { type inquiry } from "../../models/inquiries";

export const createInquiry = async (inquiry: Partial<inquiry>): Promise<inquiry> => {
    if (!inquiry.message || !inquiry.name || !inquiry.phoneNumber) {
        throw new Error("Missing required fields: name, phoneNumber, message");
    }
    const [createdInquiry] = await db.insert(inquiries).values({
        name: inquiry.name,
        phoneNumber: inquiry.phoneNumber,
        message: inquiry.message,
        settled: false,
    }).returning();

    const newInquiry: inquiry = {
        id: createdInquiry.id,
        name: createdInquiry.name,
        phoneNumber: createdInquiry.phoneNumber,
        message: createdInquiry.message,
        createdAt: new Date(createdInquiry.createdAt),
        updatedAt: new Date(createdInquiry.updatedAt),
        settled: createdInquiry.settled,
        settledAt: createdInquiry.settledAt ? new Date(createdInquiry.settledAt) : undefined,
    }

    return newInquiry;
}

export const getInquiries = async (): Promise<inquiry[]> => {
    const allInquiries = await db.select().from(inquiries);
    return allInquiries.map(inquiry => ({
        id: inquiry.id,
        name: inquiry.name,
        phoneNumber: inquiry.phoneNumber,
        message: inquiry.message,
        createdAt: new Date(inquiry.createdAt),
        updatedAt: new Date(inquiry.updatedAt),
        settled: inquiry.settled,
        settledAt: inquiry.settledAt ? new Date(inquiry.settledAt) : undefined,
    }));
}