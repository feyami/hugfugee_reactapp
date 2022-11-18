import UserSchema from '../models/userModel.js';
import bcrypt from 'bcryptjs';



//* GET all users
export const getUsers = async (req, res) => {
    try {
        const users = await UserSchema.find().populate('languages');
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//* GET user by id
export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserSchema.findById(id).populate('languages');
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserWithCredentials = async (req, res) => {
    const id = req.user._id;
    if (req.user) {
        const user = await UserSchema.findById(id).populate('languages');
        res.status(200).json({
            success: true,
            message: "successfully authenticated",
            user,
            //   cookies: req.cookies
        });
    }
};



//* POST create user
export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new UserSchema(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//* PATCH update user
export const updateUser = async (req, res) => {
    console.log("updateUser", req.body);
    const id  = req.body.id;
    const user = req.body.values;
    if (!UserSchema.findById(id)) {
        return res.status(404).json({ message: "User not found" });
    }
    console.log("id", id);
    console.log("user", user);
    const updatedUser = await UserSchema.findByIdAndUpdate(id, user, { new: true });
    res.json({ data: updatedUser });
}

//* DELETE delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!UserSchema.findById(id)) {
        return res.status(404).json({ message: "User not found" });
    }
    await UserSchema.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully" });
}




