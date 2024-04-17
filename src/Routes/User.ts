import { Router } from "express";
import { userSignup ,userSignin} from "../controllers/userController";
const userRouter = Router();

// User Registration :---
userRouter.post('/userSignup',userSignup);
userRouter.post('/userSignin',userSignin);

export default userRouter;