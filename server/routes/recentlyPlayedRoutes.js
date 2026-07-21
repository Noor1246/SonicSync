const express = require("express");
const router = express.Router();

const {
  addRecentlyPlayed,
  getRecentlyPlayed,
} = require("../controllers/recentlyPlayedController");

router.post("/", addRecentlyPlayed);

router.get("/:userId", getRecentlyPlayed);

module.exports = router;