import { transactionService } from "../services/TransactionService";
import { AuthRequest } from "../models/requests/AuthRequest";
import { Response } from "express";

export class TransactionController {
    async createTransaction(req: AuthRequest, res: Response) {
        if(!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admin role required" });
        }
        try {
            const transactionData = req.body;
            const transaction = await transactionService.createTransaction(transactionData);
            res.status(201).json(transaction);
        } catch (error) {
            console.error("Error creating transaction:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
    async getTransactionById(req: AuthRequest, res: Response) {
        const transactionId = req.params.id;
        try {
            const transaction = await transactionService.getTransactionById(transactionId);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }
            res.status(200).json(transaction);
        } catch (error) {
            console.error("Error fetching transaction:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}