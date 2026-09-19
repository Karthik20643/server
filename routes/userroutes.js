import express from "express";
import { getuserbookings } from "../controllers/usercontroller";

const userrouter = express.Router();

userrouter.get('/bookings' , getuserbookings)
userrouter.post('update-favorite' , updatefavorite)



export default userrouter