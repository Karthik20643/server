import express from 'express' ;
import cors from 'cors';
import dotenv from 'dotenv' ; 
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from "./inngest/index. js"
import showrouter from './routes/showroutes.js'
import bookingrouter from './routes/bookingroutes.js';
import adminroutes from './routes/adminroutes.js';
dotenv.config();

const app = express();
const port= 3000;

connectDB().catch((error) => {
    console.error('starting without database connection:', error.message);
});

//middleware

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())
app.use(bookingrouter())
app.use('/api/admin',adminrouter)
//API routes    

app.get('/', (req,res) => 
    res.send("server is live")
)
app. use('/api/inngest', serve({ client: inngest, functions } ))
app.use('/api/show', showrouter)

app.listen(port, ()=>console.log(`listening at ${port}`))

