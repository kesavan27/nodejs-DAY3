import express from "express";
import mentorModel from "../db-utils/models/mentorModels.js";
import studentModel from "../db-utils/models/studentModels.js";
const commenDbRouter = express.Router();
// Assign a student to Mentor
commenDbRouter.put("/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { mentorId } = req.body;

  try {
    const student = await studentModel.findById(studentId);
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }

    const mentor = await mentorModel.findById(mentorId);
    if (!mentor) {
      return res.status(404).send({ error: "Mentor not found" });
    }

    student.mentor = mentorId;
    await student.save();

    res.send(student);
    mentor.students.push(studentId);
    await mentor.save();
  } catch (error) {
    res.status(400).send(error);
  }
});
//Assign Or Change Mentor
commenDbRouter.put("/students/:studentId/mentor", async (req, res) => {
  const { studentId } = req.params;
  const { mentorId } = req.body;

  try {
    const student = await studentModel.findById(studentId);
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }

    // Check if the mentor exists
    const mentor = await mentorModel.findById(mentorId);
    if (!mentor) {
      return res.status(404).send({ error: "Mentor not found" });
    }

    // Update student's previous mentor
    if (student.mentor && student.mentor.toString() !== mentorId) {
      student.previousMentor = student.mentor;
    }

    // Update student's current mentor
    student.mentor = mentorId;
    await student.save();

    // Update mentor's students list
    if (!mentor.students.includes(studentId)) {
      mentor.students.push(studentId);
      await mentor.save();
    }

    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});
commenDbRouter.get("/:mentorId", async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const mentors = await mentorModel.findById(mentorId).populate("students");
    res.send(mentors.students);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Get previous mentor
commenDbRouter.get("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await studentModel
      .findById(studentId)
      .populate("previousMentor");
    if (!student) {
      return res.status(404).send({ error: "Student not found" });
    }

    res.send(student.previousMentor);
  } catch (error) {
    res.status(400).send(error);
  }
});
export default commenDbRouter;