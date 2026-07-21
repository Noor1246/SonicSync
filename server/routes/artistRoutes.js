const express = require("express");
const router = express.Router();

const {
  getArtists,
  getArtistByName,
} = require("../controllers/artistController");

router.get("/", getArtists);
router.get("/:name", getArtistByName);

module.exports = router;