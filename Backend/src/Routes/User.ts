import { Router } from "express";
import { memberSignup ,Signin, SecretaryApplication, CreatingSecretary, getAllSecretary, SocietyMembers} from "../controllers/userController";
import { SecretaryMiddleware, SuperAdminMiddleware} from "../middlewares/middleware";
const userRouter = Router();

// User Registration :---
userRouter.post('/memberSignup',memberSignup);
userRouter.post('/everyoneSignin',Signin);
userRouter.post('/SecretaryApplication',SecretaryApplication)
userRouter.post('/CreateSecretary',SuperAdminMiddleware,CreatingSecretary)
userRouter.get('/getAllSecretary',SuperAdminMiddleware,getAllSecretary)
userRouter.get('/societyMembers',SecretaryMiddleware,SocietyMembers)


export default userRouter;