const User = require('../models/User.Model')
const bcrypt = require('bcryptjs')

const authHandler ={
    signup: async (req, res) => {
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
            res.status(500).json({
                message: err.message,
            })
        }
   
    }
}

module.exports =  authHandler