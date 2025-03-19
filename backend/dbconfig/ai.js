require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GenerativeAIKey;
const genAI = new GoogleGenerativeAI(API_KEY);

module.exports = genAI;
