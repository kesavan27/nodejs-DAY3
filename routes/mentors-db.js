import express from "express";
import mentorModel from "../db-utils/models/mentorModels.js";
const mentorsDbRouter = express.Router();
//create a new mentors
mentorsDbRouter.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const mentor = new mentorModel({
      ...payload,
      id: Date.now().toString(),
      studentId: null,
    });
    try {
      await mentor.save();
      res.status(201).send({ msg: "Mentor added successfully" });
    } catch (err) {
      res.status(400).send({ msg: "Write the correct mentor fields" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal Server error" });
  }
});
//Get all the mentors

mentorsDbRouter.get("/", async (req, res) => {
  try {
    const mentors = await mentorModel.find({}, { projection: { _id: 0 } });
    res.send({ msg: "Info of all the teachers", mentors });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal Server error" });
  }
});
export default mentorsDbRouter;