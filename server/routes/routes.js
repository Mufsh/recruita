const express = require("express");
const connectDB = require("../database/connect");
const router = express.Router();
let pool = null;

router.route("/add").post(async (req, res) => {
  const { name, email, phone, skills, status, salary } = req.body;

  if (!name || !email || !phone || !skills || !salary || !status) {
    return res.status(400).json({ message: "Missing required fields!" });
  }
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email address!" });
  } else if (phone.length != 10) {
    return res
      .status(400)
      .json({ success: false, message: "Enter a correct phone number" });
  }
  try {
    if (!pool) pool = connectDB();
    const score = calculateScore(skills);
    const result = await pool.query(
      "INSERT INTO candidates (name, email, phone, status, skills, salary, score) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, email, phone, status, JSON.stringify(skills), salary, score]
    );
    res.status(201).json({
      success: true,
      message: "Candidate succesfully added to database",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.route("/viewall").get(async (req, res) => {
  try {
    if (!pool) pool = connectDB();
    const result = await pool.query("SELECT * FROM candidates");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.route("/search").post(async (req, res) => {
  if (!pool) pool = connectDB();
  const { email } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM candidates WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.route("/update").post(async (req, res) => {
  const { name, email, status, salary } = req.body;
  try {
    const result = await pool.query(
      "UPDATE candidates SET status = $1,salary = $2 WHERE email = $3 RETURNING *",
      [status, salary, email]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });
    }
    res.json({
      success: true,
      message: "Candidate details updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.route("/delete").post(async (req, res) => {
  if (!pool) pool = connectDB();
  const { email } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM candidates WHERE email = $1 RETURNING *",
      [email]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });
    }
    res.json({ success: true, message: "Candidate deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

function calculateScore(skills) {
  let totalScore = 0;

  skills.forEach((skill) => {
    const lowerCaseSkill = skill.skill.toLowerCase();
    if (lowerCaseSkill.includes("node")) {
      switch (skill.experience) {
        case "0-1":
          totalScore += 1;
          break;
        case "1-2":
          totalScore += 2;
          break;
        case "2+":
          totalScore += 3;
          break;
        default:
          break;
      }
    } else if (lowerCaseSkill.includes("react")) {
      switch (skill.experience) {
        case "0-1":
          totalScore += 1;
          break;
        case "1-2":
          totalScore += 2;
          break;
        case "2+":
          totalScore += 3;
          break;
        default:
          break;
      }
    }
  });

  return totalScore;
}
module.exports = router;
