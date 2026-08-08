import express from "express";

import { createTeacher } from "../Controller/teachercontroller.js";
const router = express.Router();

router.post("/createTeacher", createTeacher);
export default router;