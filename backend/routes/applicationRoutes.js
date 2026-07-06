const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  applyJob,
  myApplications,
  getEmployerApplications,
} = require(
  "../controllers/applicationController"
);

// Apply Job
router.post(
  "/apply",
  protect,
  upload.single("resume"),
  applyJob
);

// Candidate Dashboard
router.get(
  "/my",
  protect,
  myApplications
);

// Employer Dashboard
router.get(
  "/employer",
  protect,
  getEmployerApplications
);

module.exports = router;