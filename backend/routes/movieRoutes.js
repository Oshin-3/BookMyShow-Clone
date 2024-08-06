const movieRouter = require('express').Router()
const { addMovie, getAllMovie, updateMovie, deleteMovie } = require('../controller/movieController')


movieRouter.post('/add-movie', addMovie)
movieRouter.get('/get-all-movies', getAllMovie)
movieRouter.put('/update-movie', updateMovie)
movieRouter.post('/delete-movie', deleteMovie)


module.exports = movieRouter