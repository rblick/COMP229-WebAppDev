const User = require("../models/user");
const extend = require("lodash/extend");

exports.add = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            success: true,
            message: "User added successfully.",
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                created: user.created,
                updated: user.updated,
                id: user._id.toString()
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Users list retrieved successfully.",
            data: users.map((user) => ({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                created: user.created,
                updated: user.updated,
                id: user._id.toString()
            }))
        });
    } catch (err) {
        next(err);
    }
};

exports.getByID = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "User retrieved successfully.",
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                created: user.created,
                updated: user.updated,
                id: user._id.toString()
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        extend(user, req.body);
        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully."
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });
    } catch (err) {
        next(err);
    }
};