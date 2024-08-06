const MovieModel = require('../model/movieModel')

//add a movie
const addMovie = async (req, res) => {
    try {
        console.log("controller-> ", req.body)
        const newMovie = new MovieModel(req.body)
        await newMovie.save()

        res.send({
            success: true,
            message: "New movie added successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

//get all movie
const getAllMovie = async (req, res) => {
    try {
        const allMovies = await MovieModel.find()
        res.send({
            success: true,
            movie: allMovies
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

//update movie 
const updateMovie = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.body.movieId)
        await MovieModel.findByIdAndUpdate(req.body.movieId, req.body)

        res.send({
            success: true,
            message: "Movie details are updated sccuessfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

//delete movie
const deleteMovie = async (req, res) => {
    try {
        console.log("req.body-> ",req.body)
        await MovieModel.findByIdAndDelete(req.body.movieId)

        res.send({
            success: true,
            message: "Movie details deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}


module.exports = {
    addMovie,
    getAllMovie,
    updateMovie,
    deleteMovie
}