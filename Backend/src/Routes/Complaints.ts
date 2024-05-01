import {Router} from 'express'
import { SecretaryMiddleware, userMiddleware } from '../middlewares/middleware';
import { CreateComplaint, getAllComplaint, myCompaint } from '../controllers/ComplaintsController';
const ComplaintRouter = Router();


ComplaintRouter.post('/createComplaint',userMiddleware,CreateComplaint);
ComplaintRouter.get('/myCompaint',userMiddleware,myCompaint)
ComplaintRouter.get('/allComplaint',SecretaryMiddleware,getAllComplaint)

export default ComplaintRouter;