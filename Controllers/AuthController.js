const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs') 

require("dotenv").config();
//login
exports.signinController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            })
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            })
        }
        // prep payload
        const payload = {
            user: {
                _id: user._id,
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIREIN }, (err, token) => {
            if(err) console.log('jwt error: ', err);
            const { _id, username, email, role,profilPic }  = user;
            res.json({
                token,
                user: { _id, username, email, role,profilPic},
            })
        })
    } catch (err) {
        console.log('singinController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error'
        })
    }
}
//register
exports.signupController = async (req, res) => {
    console.log(req.file)
    const {filename}=req.file;
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                errorMessage: 'Email already exists',
            });
        }
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.fileName = filename;
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        res.json({
            successMessage: 'Registration success. Please signin',
        })
    } catch (err) {
        console.log('signupController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        })
    }
}