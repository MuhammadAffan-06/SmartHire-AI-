const getPdfs = require("../controller/hr.controller");
const screenResumes = require("../controller/hr.controller");
const express = require("express");
const router = express.Router();

router
    .get("/pdfs", getPdfs.getPdfs)
    .get("/scan/resume",screenResumes.screenResumes)

module.exports = router;
