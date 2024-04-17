import { Router  } from "express";
import {AdminMiddleware,userMiddleware} from '../middlewares/middleware'
import {CreatePoll,GetAPoll, submitPoll} from '../controllers/PollController'
const PollRouter = Router();

// User Registration :---
PollRouter.post('/CreatePoll',AdminMiddleware,CreatePoll);
PollRouter.get('/getAPoll',userMiddleware,GetAPoll);
PollRouter.put('/submitPoll/:pollId',userMiddleware,submitPoll);

export default PollRouter;