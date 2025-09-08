export interface Transaction {
    id: string;
    userId: string;
    carRegistrationNumber: string;
    amount: number;
    transactionDate: Date;
    status: 'pending' | 'completed' | 'failed';
    paymentMethod: 'credit_card' | 'debit_card';
}