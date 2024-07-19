const express = require('express')
require('dotenv').config() // to access env variables

const connectDb = require('./config/dbConfig')
const userRouter = require('./routes/userRoutes')

const app = express()
app.use(express.json())
connectDb()

//Routes
app.use('/api/users', userRouter)


const port = 8082

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})