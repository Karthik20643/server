import express from "express";
import { getallbookings, getdashboarddata, isadmin } from "../controllers/admincontroller";

const adminrouter = express.Router()

adminrouter.get('/isadmin' , protectadmin ,isadmin),
adminrouter.get('/dashboard' , protectadmin ,getdashboarddata),
adminrouter.get('/allshows' , protectadmin ,getallshows),
adminrouter.get('/allbookings' , protectadmin ,getallbookings)

export default adminroutes