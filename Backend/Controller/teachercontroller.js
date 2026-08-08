import mongoose from "mongoose";
import Teacher from "../Model/teachermodel.js";

export const createTeacher = async (req, res) => {
    try {

        console.log("MongoDB readyState:", mongoose.connection.readyState);
        console.log("Request body:", req.body);

        const { name, email, subject, classes } = req.body;

        const teacherExist = await Teacher.findOne({ email });

        if (teacherExist) {
            return res.status(400).json({
                errorMessage: "Teacher already exists"
            });
        }

        const newTeacher = new Teacher({
            name,
            email,
            subject,
            classes
        });

        const savedTeacherData = await newTeacher.save();

        res.status(201).json(savedTeacherData);

    } catch (error) {
        console.error("Create teacher error:", error);

        res.status(500).json({
            errorMessage: error.message
        });
    }
};