const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { urlencoded } = require("express");
const router = require("./routers/index");
const handleErrorMiddleware = require("./middleware/error");

const app = express();
// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());
app.use(urlencoded({ extended: true }));
// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(router);

// Check error
app.use(handleErrorMiddleware);

// Redirect all requests to the REACT app
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export
module.exports = app;
