const express = require("express");
const router = express.Router();

const { localFileUpload, imageUpload } = require("../controllers/fileUpload");

router.post("/localfile", localFileUpload);
router.post("/imageFile", imageUpload);
module.exports = router;
