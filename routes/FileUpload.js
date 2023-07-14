const express = require("express");
const router = express.Router();

const { localFileUpload } = require("../controllers/fileUpload");

router.post("/localfile", localFileUpload);

module.exports = router;
