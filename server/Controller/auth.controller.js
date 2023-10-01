const User = require('../models/User.Model')
const bcrypt = require('bcryptjs')
const errorHandler = require('../utils/error')

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
   
    }
}

module.exports =  authHandler