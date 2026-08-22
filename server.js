import express from 'express' ;
import cors from 'cors';
import dotenv from 'dotenv' ; 


const app = express();
const port= 3000;

//middleware

app.use(express.json())
app.use(cors())

//API routes

app.get('/', (req,res) => 
    res.send("server is live")
)


app.listen(port, ()=>console.log(`listening at ${port}`))

