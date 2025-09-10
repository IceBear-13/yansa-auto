import { Response } from "express";
import { AuthRequest } from "../models/requests/AuthRequest";
import inquiriesService from "../services/inquiriesService";
import { inquiry } from "../models/inquiries";

class inquiriesController {
    async getInquiries(req: AuthRequest, res: Response) {
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }
            const allInquiries = await inquiriesService.getInquiries();
            res.status(200).json(allInquiries);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async createInquiry(req: AuthRequest, res: Response) {
        try {
            const inquiryData: inquiry = req.body;
            const newInquiry = await inquiriesService.createInquiry(inquiryData);
            res.status(201).json(newInquiry);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

}


export const inquiriesControllerInstance = new inquiriesController();