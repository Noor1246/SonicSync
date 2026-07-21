const express = require("express");
const router = express.Router();

const {
  saveSearch,
  getSearches,
} = require("../controllers/recentSearchController");

router.post("/", saveSearch);

router.get("/:userId", getSearches);

module.exports = router;