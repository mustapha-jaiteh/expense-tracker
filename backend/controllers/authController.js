import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// generate jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// register user
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        let profileImageUrl = req.body.profileImageUrl || null;

        // If file is uploaded, use the file path
        if (req.file) {
            profileImageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        //validate user
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        //check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        //create user
        const user = await User.create({ fullName, email, password, profileImageUrl });
        res.status(201).json({
            _id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}; 

 // login user
 export const loginUser = async (req, res) => {
     const {email, password} = req.body;
     if(!email || !password){
        return res.status(400).json({ message: "Please fill all the fields" });
     }

     try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordMatched = await user.matchPassword(password);
        if(!isPasswordMatched){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({
            _id: user._id,
            user,
            token: generateToken(user._id),
        });
     } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
     }

     
};

// get user info
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error getting user info", error: error.message });
    }
};

