import express from 'express' ;
import { addshow, getNowplayingmovies, getshow, getshows } from '../controllers/Showcontroller.js';

const showrouter = express.Router() ;

showrouter.get('/nowplaying',protectadmin, getNowplayingmovies)
showrouter.post('/add', protectadmin, addshow)

showrouter.get('/all' , getshows)
showrouter.get('/:movieid' ,getshow)

showrouter.get('/now-playing',getNowplayingmovies)

export default showrouter