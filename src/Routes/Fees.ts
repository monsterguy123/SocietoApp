import {Router} from 'express'
import { AdminMiddleware } from '../middlewares/middleware';
import { CreateFees } from '../controllers/FeesController';
const FeesRouter = Router();

FeesRouter.post('/createfee',AdminMiddleware,CreateFees)

export default FeesRouter;