import axios from 'axios';
import Movie from '../Movies.js';

export const getNowplayingmovies = async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        });

        const movies = response.data.results;
        return res.json({ success: true, movies });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const addshow = async (req, res) => {
    try {
        const { movieid, showinput, showprice } = req.body;
        let movie = await Movie.findById(movieid);

        if (!movie) {
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieid}`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
                }),
                axios.get(`https://api.themoviedb.org/3/movie/${movieid}/credits`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
                }),
            ]);

            const movieApiData = movieDetailsResponse.data;
            const castData = movieCreditsResponse.data.cast || [];

            movie = await Movie.create({
                id: String(movieApiData.id),
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline,
                genres: movieApiData.genres || [],
                casts: castData.slice(0, 10).map((cast) => ({
                    name: cast.name,
                    profile_path: cast.profile_path,
                })),
                vote_average: movieApiData.vote_average,
                runtime: movieApiData.runtime, 
                showinput,
                showprice,
            });
        }

        return res.json({ success: true, movie });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};