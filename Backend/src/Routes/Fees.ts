import {Router} from 'express'
import { AdminMiddleware,userMiddleware } from '../middlewares/middleware';
import { CreateFees, SubmitFees } from '../controllers/FeesController';
const FeesRouter = Router();

FeesRouter.post('/createfee',AdminMiddleware,CreateFees)
FeesRouter.post('/feeSubmitted/:feeId',userMiddleware,SubmitFees)

export default FeesRouter;