import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/ApiError.js";

// generate jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// register user
export const registerUser = catchAsync(async (req, res) => {
    const { fullName, email, password } = req.body;

    let profileImageUrl = req.body.profileImageUrl || null;

    // If file is uploaded, use the file path
    if (req.file) {
        profileImageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    //validate user
    if (!fullName || !email || !password) {
        throw new ApiError(400, "Please fill all the fields");
    }
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError(400, "User already exists");
    }
    //create user
    const user = await User.create({ fullName, email, password, profileImageUrl });
    res.status(201).json({
        _id: user._id,
        user,
        token: generateToken(user._id),
    });
}); 

 // login user
 export const loginUser = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new ApiError(400, "Please fill all the fields");
    }

    const user = await User.findOne({ email });
    if(!user){
        throw new ApiError(401, "Invalid credentials");
    }
    const isPasswordMatched = await user.matchPassword(password);
    if(!isPasswordMatched){
        throw new ApiError(401, "Invalid credentials");
    }
    res.status(200).json({
        _id: user._id,
        user,
        token: generateToken(user._id),
    });
});

// get user info
export const getUserInfo = catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if(!user){
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(user);
});
