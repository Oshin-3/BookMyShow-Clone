 const UserModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

//add user details
const addUser = async (req, res) => {
    try {
        //check if user already exists or not
        const userExists = await UserModel.findOne({email: req.body.email})
        if (userExists)
            return res.send({
                success: false,
                message : "User already exists"
            })

            const newUser = new UserModel(req.body)
            await newUser.save()
            res.send({
                success : true,
                message : "User registered successfully"
            })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : "Internal Server Error"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        console.log(req.body.email)
        const user = await UserModel.findOne({email: req.body.email})
        console.log(user)
        if (!user){
            return res.send({
                success : false,
                message : "User not found, Please sign up"
            })
        }
        else if (req.body.password !== user.password){
                return res.send({
                    success : false,
                    message: "Password is incorrect. Please try again"
                })
        }
        else {
            const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })
            console.log("token -> ", token)
            res.send({
                success : true,
                message : "Login Successful",
                user: user,
                data: token
            })
        }
            
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : "Internal Server Error"
        })
    }
}

//get users
const getCurrentUser = async (req, res) => {
    const user = await UserModel.findById(req.body.userId).select('-password')
    res.send({success: true, user: user, message: "You are authorized to go to the protected route"})
}

module.exports = {
    addUser,
    loginUser,
    getCurrentUser
}