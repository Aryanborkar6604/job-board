const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply For Job
exports.applyJob = async (req, res) => {
  try {
    const application = await Application.create({
      candidate: req.user.id,
      job: req.body.jobId,
      resume: req.file
        ? req.file.filename
        : "",
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Candidate Applications
exports.myApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await Application.find({
        candidate: req.user.id,
      }).populate("job");

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Employer Dashboard
exports.getEmployerApplications =
  async (req, res) => {
    try {
      const jobs = await Job.find({
        employer: req.user.id,
      });

      const jobIds = jobs.map(
        (job) => job._id
      );

      const applications =
        await Application.find({
          job: {
            $in: jobIds,
          },
        })
          .populate(
            "candidate",
            "name email"
          )
          .populate(
            "job",
            "title company"
          );

      res.json(applications);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };