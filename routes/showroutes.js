import express from 'express' ;
import { getNowplayingmovies } from '../models/controllers/Showcontroller.js';

const showrouter = express.Router() ;


showrouter.get('/now-playing',getNowplayingmovies)