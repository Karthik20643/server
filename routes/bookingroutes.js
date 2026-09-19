import express from 'express'
import { createbooking, getoccupiedseats } from '../controllers/bookingcontroller.js';

const bookingrouter = express.Router() ;

bookingrouter.post('/create' ,createbooking)

bookingrouter.get('/seats/:showid', getoccupiedseats)

export default bookingrouter ;

