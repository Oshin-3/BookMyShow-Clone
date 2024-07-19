const express = require('express')
const { addUser, loginUser, getCurrentUser } = require('../controller/userController')
const auth  = require('../middlewares/authMiddleware')


const userRouter = express.Router()

//post req
userRouter.post('/register', addUser)
userRouter.post('/login', loginUser)

//get req
userRouter.get('/get-current-user', auth, getCurrentUser)

module.exports = userRouter
