const Service = require("../models/service");
const extend = require("lodash/extend");

exports.add = async (req, res, next) => {
    try {
        const service = new Service(req.body);
        await service.save();

        res.status(201).json({
            success: true,
            message: "Service added successfully.",
            data: {
                title: service.title,
                description: service.description,
                id: service._id.toString()
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const services = await Service.find();

        res.status(200).json({
            success: true,
            message: "Services list retrieved successfully.",
            data: services.map((service) => ({
                title: service.title,
                description: service.description,
                id: service._id.toString()
            }))
        });
    } catch (err) {
        next(err);
    }
};

exports.getByID = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Service retrieved successfully.",
            data: {
                title: service.title,
                description: service.description,
                id: service._id.toString()
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        extend(service, req.body);
        await service.save();

        res.status(200).json({
            success: true,
            message: "Service updated successfully."
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        await service.deleteOne();

        res.status(200).json({
            success: true,
            message: "Service deleted successfully."
        });
    } catch (err) {
        next(err);
    }
};