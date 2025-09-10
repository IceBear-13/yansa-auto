import { Router } from "express";
import { transactionController } from "../controller/transactionController";

const router = Router();

router.post('/transaction/create', transactionController.createTransaction.bind(transactionController));
router.get('/transaction/:id', transactionController.getTransactionById.bind(transactionController));

export default router;