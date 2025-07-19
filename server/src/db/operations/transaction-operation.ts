import { db } from "../db";
import { Transaction } from "../../models/transaction";
import { transactions } from "../schema/transaction";
import { eq } from "drizzle-orm";

export const createTransaction = async (transaction: Omit<Transaction, 'id' | 'transactionDate'>): Promise<Transaction> =>{
    const [createdTransaction] = await db.insert(transactions).values({
        userId: transaction.userId,
        carRegistrationNumber: transaction.carRegistrationNumber,
        amount: transaction.amount,
        status: transaction.status,
        paymentMethod: transaction.paymentMethod,
    }).returning();

    const newTransaction: Transaction = {
        id: createdTransaction.id,
        carRegistrationNumber: createdTransaction.carRegistrationNumber,
        amount: createdTransaction.amount,
        userId: createdTransaction.userId as string,
        transactionDate: new Date(createdTransaction.transactionDate),
        status: createdTransaction.status as "pending" | "completed" | "failed",
        paymentMethod: createdTransaction.paymentMethod as "credit_card" | "debit_card"
    }

    return newTransaction

}

export const getTransactionById = async (id: string): Promise<Transaction> => {
    const transaction = await db.select()
        .from(transactions)
        .where(eq(transactions.id, id))
        .limit(1)
        .then(rows => rows[0]);

    const newTransaction: Transaction = {
        id: transaction.id,
        carRegistrationNumber: transaction.carRegistrationNumber,
        amount: transaction.amount,
        userId: transaction.userId as string,
        transactionDate: new Date(transaction.transactionDate),
        status: transaction.status as "pending" | "completed" | "failed",
        paymentMethod: transaction.paymentMethod as "credit_card" | "debit_card"
    }
    
    return newTransaction;
}