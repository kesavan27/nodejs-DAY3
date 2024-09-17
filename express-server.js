import express from "express";
import studentsDbRouter from "./routes/students-db.js";
import mentorsDbRouter from "./routes/mentors-db.js";

import commenDbRouter from "./routes/commendb.js";
import connectToMongoose from "./db-utils/mongoosedb-connection.js";

let server = express();
server.use(express.json());
await connectToMongoose();
server.use("/students", studentsDbRouter);
server.use("/mentors", mentorsDbRouter);
server.use("", commenDbRouter);
const port = 8000;
server.listen(port, () => {
  console.log("listening on port", port);
});