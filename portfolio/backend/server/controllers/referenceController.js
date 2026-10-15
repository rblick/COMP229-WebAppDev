const Reference = require("../models/reference");
const extend = require("lodash/extend");

exports.add = async (req, res, next) => {
    try {
        const reference = new Reference(req.body);
        await reference.save();

        res.status(201).json({
            success: true,
            message: "Reference added successfully.",
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
            message: "References list retrieved successfully.",
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
                message: "Reference not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Reference retrieved successfully.",
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
        const reference = await Reference.findById(req.params.id);

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found."
            });
        }

        extend(reference, req.body);
        await reference.save();

        res.status(200).json({
            success: true,
            message: "Reference updated successfully."
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const reference = await Reference.findById(req.params.id);

        if (!reference) {
            return res.status(404).json({
                success: false,
                message: "Reference not found."
            });
        }

        await reference.deleteOne();

        res.status(200).json({
            success: true,
            message: "Reference deleted successfully."
        });
    } catch (err) {
        next(err);
    }
};