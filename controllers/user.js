const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('../helpers/helpers')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.register = async (req, res) => {
    const { username, email, password,  } = req.body;
    try {

        // let picture = {}; // Empty object for profile picture
        // if (req.files && req.files.profilePicture) {
        //     picture = await new Promise((resolve, reject) => {
        //         cloudinary.uploader.upload(req.files.profilePicture.tempFilePath, {
        //             folder: 'Student_app', // Specify the folder name here
        //             allowed_formats: ['txt', 'doc', 'pdf', 'docx', 'png', 'jpeg'], // Allow these file formats
        //             max_file_size: 2000000 // Maximum file size in bytes (2MB)
        //         }, (error, result) => {
        //             if (error) {
        //                 reject(error);
        //             } else {
        //                 resolve(result);
        //             }
        //         });
        //     });
        // }

        const user = await User.create({ username,
             email,
              password,
             // role ,
             // profilePicture: { public_id: picture.public_id, url: picture.url },
            });
        const token = signToken(user._id);
        res.status(201).json({ token, data: { user } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = signToken(user._id);
        res.status(200).json({message:"login successfuly" ,token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};
