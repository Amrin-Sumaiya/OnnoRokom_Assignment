import express from "express";

import { createTeacher, getAllTeachers } from "../Controller/teachercontroller.js";
const router = express.Router();

router.post("/createTeacher", createTeacher);
router.get("/getAllTeachers", getAllTeachers);
export default router;