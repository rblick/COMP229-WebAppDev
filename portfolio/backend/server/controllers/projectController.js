const Project = require("../models/project");
const extend = require("lodash/extend");

exports.add = async (req, res, next) => {
    try {
        const project = new Project(req.body);
        await project.save();

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
                message: "Project not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Project retrieved successfully.",
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
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        extend(project, req.body);
        await project.save();

        res.status(200).json({
            success: true,
            message: "Project updated successfully."
        });
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            message: "Project deleted successfully."
        });
    } catch (err) {
        next(err);
    }
};