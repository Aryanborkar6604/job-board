const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    },

    resume: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);