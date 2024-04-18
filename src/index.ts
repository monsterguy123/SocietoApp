import express,{Application} from 'express'
import {config} from 'dotenv'
import userRouter from './Routes/User';
import PollRouter from './Routes/Poll';
import FeesRouter from './Routes/Fees';
config();

const app:Application = express();

//middlewares
app.use(express.json());

//routes
app.use('/api/v1',userRouter);
app.use('/api/v1/poll',PollRouter)
app.use('api/v1/admin',FeesRouter)




const PORT = process.env.PORT;

app.listen(5000,()=>{
     console.log(`App is listening to port `,5000);
})