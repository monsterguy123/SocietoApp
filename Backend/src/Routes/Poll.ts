import { Router  } from "express";
import {SecretaryMiddleware,userMiddleware} from '../middlewares/middleware'
import {CreatePoll,GetAPoll, GetPolls, RemovePoll, submitPoll} from '../controllers/PollController'
const PollRouter = Router();

// User Registration :---
PollRouter.post('/CreatePoll',SecretaryMiddleware,CreatePoll);
PollRouter.get('/getAPoll',userMiddleware,GetAPoll);
PollRouter.get('/getPolls',SecretaryMiddleware,GetPolls);
PollRouter.put('/submitPoll/:pollId',userMiddleware,submitPoll);
PollRouter.delete('/deletePoll/:pollId',SecretaryMiddleware,RemovePoll);

export default PollRouter;