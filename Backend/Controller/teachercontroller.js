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

//get all teachers data

export const getAllTeachers = async(req, res) => {

    try {
        const teachersData = await Teacher.find();
        if(!teachersData || teachersData.length === 0){
            return res.status(404).json({ message: "No teachers found" });
        }
        res.status(200).json(teachersData);

    } catch (error){
        res.status(500).json({ errorMessage: error.message });

    }
}