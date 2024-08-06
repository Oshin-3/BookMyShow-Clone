const theaterRoute = require('express').Router()

const { addTheaters, updateTheaterDetails, deleteTheater, getAllTheaterByOwner, getAllTheaters} = require('../controller/theaterController')

//routes
theaterRoute.post('/add-theater', addTheaters)
theaterRoute.put('/update-theater', updateTheaterDetails)
theaterRoute.delete('/delete-theater/:theaterId', deleteTheater)
theaterRoute.get('/get-all-theaters', getAllTheaters)
theaterRoute.get('/get-all-theaters-by-id/:ownerId', getAllTheaterByOwner)

module.exports = theaterRoute