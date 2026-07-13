const jwt = require("jsonwebtoken")
const User = require('../models/user')
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    try {
        const {firstName,middleName, lastName, email, phoneNumber,password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({ message: " User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          firstName,
          middleName,
           lastName, 
           email, 
           phoneNumber,
           password: hashedPassword, 
           role
        });
        await user.save();

        res.status(201).json({
            message: "User Registered successfully"
        })
    }
    catch(error){
        res.status(500).json({ message: error.message})
    }
};


const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }  
    
    if (user.isBlocked) {
    return res.status(403).json({
        message: "Your account has been suspended. Please contact support."
    });
}


    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const token = jwt.sign(
        {id:user._id,
            role: user.role
        }, 
        process.env.JWT_SECRET,{
            expiresIn: "7d",
        }
    );

    res.status(200).json({
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    });
    }


    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({
                message: "Access Denied!"
            });
        }
        next();
    }
}

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.firstName = req.body.firstName || user.firstName;
        user.middleName = req.body.middleName || user.middleName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = { register, login, authorizeRoles, getProfile, updateProfile };