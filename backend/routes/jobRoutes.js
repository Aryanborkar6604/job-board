const express = require("express");

const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getJobs);
router.get("/search", searchJobs);
router.get("/:id", getJobById);

// Employer Routes
router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;