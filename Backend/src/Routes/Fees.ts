import {Router} from 'express'
import { SecretaryMiddleware,userMiddleware } from '../middlewares/middleware';
import { CreateFees, SubmitFees, getDonations } from '../controllers/DonationController';
const FeesRouter = Router();

FeesRouter.post('/createfee',SecretaryMiddleware,CreateFees)
FeesRouter.get('/getDonations',userMiddleware,getDonations)
FeesRouter.post('/donationSubmitted/:donationId',userMiddleware,SubmitFees)

export default FeesRouter;