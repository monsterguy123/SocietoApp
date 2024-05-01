import {Router} from 'express'
import { SecretaryMiddleware, userMiddleware } from '../middlewares/middleware';
import { Culpritunderstood, createNotice, myNotice } from '../controllers/NoticeController';
const NoticeRouter = Router()

NoticeRouter.post('/createNotice/:complaintId',SecretaryMiddleware,createNotice)
NoticeRouter.get('/myNotice',userMiddleware,myNotice)
NoticeRouter.post('/understood/:noticeId',userMiddleware,Culpritunderstood)

export default NoticeRouter;