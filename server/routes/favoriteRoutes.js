const express = require("express");
const router = express.Router();

const {
  toggleFavorite,
  getFavorites,
  checkFavorite,
} = require("../controllers/favoriteController");


router.post("/", toggleFavorite);

router.get("/:userId", getFavorites);

router.get(
  "/check/:userId/:songId",
  checkFavorite
);


module.exports = router;