import { Transaction } from "../models/transaction";
import * as transactionOperations from "../db/operations/transaction-operation";

export class TransactionService {
    async createTransaction(transaction: Transaction): Promise<Transaction> {
        const newTransaction = await transactionOperations.createTransaction(transaction);
        return newTransaction;
    }

    async getTransactionById(id: string): Promise<Transaction | null> {
        const transaction = await transactionOperations.getTransactionById(id);
        return transaction;
    }
}

export const transactionService = new TransactionService();