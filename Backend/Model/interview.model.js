import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    required: true,
  },
  interviewerName: {
    type: String,
    required: true,
  },
  interviewDate: {
    type: String,
    required: true,
  },
  interviewTime: {
    type: String,
    required: true,
  },
  interviewMode: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
  meetingLink: {
    type: String,
    required: false,
  },

  location: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: [
      "scheduled",
      "completed",
      "selected",
      "deleted",
      "cancelled",
    ],
    default: "scheduled",
  },
  feedback: {
    type: String,
  },
});

const Interview =
  mongoose.models.Interview ||
  mongoose.model("Interview", interviewSchema);

export default Interview;