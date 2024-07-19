const mongoose = require('mongoose')

const dbUrl = process.env.DB_URL

const connectDb = async () => {
    try {
        await mongoose.connect(dbUrl)
        console.log('Connected to the database')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb