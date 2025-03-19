const pool = require("../dbconfig/dbconfig");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = require("../dbconfig/ai");
const pdfParse = require("pdf-parse");
const fs = require("fs");

//Fetch all the pdfs from db
const getPdfs = async (req, res) => {
  try {
    const query = "SELECT * FROM pdfs";
    const results = pool.query(query);
    if (results) {
      res.json(results);
    } else {
      res.json({ message: "no documents found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const screenResumes = async (req, res) => {
  try {
    const { id } = req.body;
    const { rows } = await pool.query("SELECT * FROM pdfs WHERE id=$1", [id]);
    if (rows.length === 0) {
      res.status(404).json("Resume not found");
    }
    const filePath = rows[0].locations;

    if (!fs.existsSync(filePath)) {
      return res.status(404).json("File not found");
    }
    const pdfBuffer = fs.readFileSync(filePath);
    const resumeText = await pdfParse(pdfBuffer);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Analyze this resume and provide:
        1. Skills
        2. Experience
        3. Overall score out of 10
        The response should not be too long make it concise
        ${resumeText.text}`;

    const response = await model.generateContent(prompt);
    const aiResult = response;
    return res.json(aiResult.response.candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};
module.exports = { getPdfs, screenResumes };
