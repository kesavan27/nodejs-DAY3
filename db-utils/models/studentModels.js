import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        mentor : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
            default: null,
        },
    },
    {
        collection: "Student",
        versionKey: false,
    }
)

const studentModel = mongoose.model("Student",studentSchema);

export default studentModel;