import express from "express";

import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../Controller/teachercontroller.js";

const router = express.Router();

router.post("/createTeacher", createTeacher);

router.get("/getAllTeachers", getAllTeachers);

router.get("/getTeacherById/:id", getTeacherById);

router.put("/updateTeacher/:id", updateTeacher);

router.delete("/deleteTeacher/:id", deleteTeacher);

export default router;