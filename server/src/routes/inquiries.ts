import Router from 'express';
import { inquiriesControllerInstance } from '../controller/inquiries';
import { authMiddleware } from '../middleware/authMiddleware';

export const inquiriesRouter = Router();

inquiriesRouter.get('/', authMiddleware, inquiriesControllerInstance.getInquiries.bind(inquiriesControllerInstance));
inquiriesRouter.post('/create', inquiriesControllerInstance.createInquiry.bind(inquiriesControllerInstance));