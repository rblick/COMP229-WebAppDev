const Reference = require("../models/reference");

exports.add = async (req, res, next) => {
    try {
        const reference = await Reference.create(req.body);

        res.status(201).json({
            success: true,
            message: "reference added successfully.",
            data: {
                name: reference.name,
                testimonial: reference.testimonial,
                position: reference.position,
                company: reference.company,
                id: reference._id.toString()
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const references = await Reference.find();

        res.status(200).json({
            success: true,
            message: "references list retrieved successfully.",
            data: references.map((reference) => ({
                name: reference.name,
                testimonial: reference.testimonial,
                position: reference.position,
                company: reference.company,
                id: reference._id.toString()
            }))
        });
    } catch (err) {
        next(err);
    }
};

exports.getByID = async (req, res, next) => {
    try {
        const reference = await Reference.findById(req.params.id);

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "reference not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "reference retrieved successfully.",
            data: {
                name: reference.name,
                testimonial: reference.testimonial,
                position: reference.position,
                company: reference.company,
                id: reference._id.toString()
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "reference not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "reference updated successfully."
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndDelete(req.params.id);

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "reference not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "reference deleted successfully."
        });
    } catch (err) {
        next(err);
    }
};