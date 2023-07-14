const express = require("express");
const router = express.Router();

const {
  localFileUpload,
  imageUpload,
  imageReducedUpload,
} = require("../controllers/fileUpload");

router.post("/localfile", localFileUpload);
router.post("/imageFile", imageUpload);
router.post("/imageReducedFile", imageReducedUpload);

module.exports = router;
