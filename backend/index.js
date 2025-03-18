const express = require("express");
const app = express();
const port = 5001;

app.listen(port, () => {
  console.log(`server is up and running at http://localhost:${port}`);
});
app.get("/health-check", (req, res) => {
  res.status(200).send("Working perfectly");
});
