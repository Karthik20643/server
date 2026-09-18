import express from 'express' ;
import { addshow, getNowplayingmovies, getshow, getshows } from '../models/controllers/Showcontroller.js';

const showrouter = express.Router() ;

showrouter.get('/nowplaying',protectadmin, getNowplayingmovies)
showrouter.post('/add', protectadmin, addshow)

showrouter.get('/all' , getshows)
showrouter.get('/:movieid' ,getshow)

showrouter.get('/now-playing',getNowplayingmovies)