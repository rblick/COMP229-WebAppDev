const Project = require("../models/project");

exports.add = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            message: "Project added successfully.",
            data: {
                title: project.title,
                completion: project.completion,
                description: project.description,
                image: project.image,
                id: project._id.toString()
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const projects = await Project.find();

        res.status(200).json({
            success: true,
            message: "Projects list retrieved successfully.",
            data: projects.map((project) => ({
                title: project.title,
                completion: project.completion,
                description: project.description,
                image: project.image,
                id: project._id.toString()
            }))
        });
    } catch (err) {
        next(err);
    }
};

exports.getByID = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "project not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "project retrieved successfully.",
            data: {
                title: project.title,
                completion: project.completion,
                description: project.description,
                image: project.image,
                id: project._id.toString()
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "project not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "project updated successfully."
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "project not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "project deleted successfully."
        });
    } catch (err) {
        next(err);
    }
};