const User = require("../models/user");

exports.add = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "user added successfully.",
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
            message: "users list retrieved successfully.",
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
                message: "user not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "user retrieved successfully.",
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
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "user updated successfully."
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "user deleted successfully."
        });
    } catch (err) {
        next(err);
    }
};