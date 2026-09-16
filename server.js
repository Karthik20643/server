import express from 'express' ;
import cors from 'cors';
import dotenv from 'dotenv' ; 
import connectDB from './configs/db.js';

dotenv.config();

const app = express();
const port= 3000;

connectDB().catch((error) => {
    console.error('starting without database connection:', error.message);
});

//middleware

app.use(express.json())
app.use(cors())

//API routes    

app.get('/', (req,res) => 
    res.send("server is live")
)


app.listen(port, ()=>console.log(`listening at ${port}`))

