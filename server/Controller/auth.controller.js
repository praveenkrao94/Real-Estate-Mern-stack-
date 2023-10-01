const User = require('../models/User.Model')
const bcrypt = require('bcryptjs')
const errorHandler = require('../utils/error')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authHandler ={
    signup: async (req, res , next) => {
        try{
            const { username, email, password } = req.body;
            const hashPass =  bcrypt.hashSync(password, 10)

            const existingUser = await User.findOne({ username });
            if(existingUser){
                return res.status(400).json({
                    message: 'Username is already in use. Please choose a different one.'
                })
            }

            const existingEmail = await User.findOne({ email });

            if (existingEmail) {
              
              return res.status(400).json({
                message: 'Email is already in use. Please use a different one.',
              });
            }


            const newUser = new User({
                username,
                email,
                password:hashPass
            })
            await newUser.save()
            res.status(200).json({
                message: 'user created successfully',
            })
        }

        catch(err){
        //    next(errorHandler(500,'error from function'))
            res.status(500).json({
               message: err.message,
            })
        }
   
    },
    signIn:async (req,res)=> {
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({
                    message: 'user not found'
                })
            }
            const passmatch = bcrypt.compareSync(password, user.password)
            if(!passmatch){
                return res.status(400).json({
                    message: 'password is not correct'
                })
            }
    
            const token = jwt.sign({id:user._id },process.env.JWT_SECRET,{expiresIn:'1d'})
            res.cookie('token',token , { httpOnly: true, maxAge: 3600000 })
    
            res.status(200).json({
                message: 'sign in successful' , "token": token , "username":user.username
            })
        }
        catch(err){
            res.status(500).json({
                message: err.message,
            })
        }
        
    }

    
}

module.exports =  authHandler