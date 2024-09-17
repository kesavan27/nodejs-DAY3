import express from "express";
import studentModel from "../db-utils/models/studentModels.js";
const studentsDbRouter = express.Router();
//create a new students
studentsDbRouter.post("/", async (req, res) => {
  try {
    const payload = req.body;

    const student = new studentModel({
      ...payload,
      id: Date.now().toString(),
      mentorId: null,
    });
    try {
      await student.save();
      res.status(201).send({ msg: "Student added successfully" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ msg: "Write all the students fields" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal Server error" });
  }
});
//Get all the students
studentsDbRouter.get("/", async (req, res) => {
  try {
    const students = await studentModel.find({}, { projection: { _id: 0 } });
    res.send({ msg: "Info of all the students", students });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal Server error" });
  }
});

export default studentsDbRouter;