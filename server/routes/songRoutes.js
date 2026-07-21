const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getSongs,
  addSong,
  updateSong,
  deleteSong,
  searchSongs,
  getRecommendations,
} = require("../controllers/songController");

router.get("/", getSongs);
const upload = require("../middleware/upload");


router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    {
      name:"image",
      maxCount:1
    },
    {
      name:"audio",
      maxCount:1
    }
  ]),
  addSong
);

router.put("/:id", protect, adminOnly, updateSong);

router.delete("/:id", protect, adminOnly, deleteSong);
router.get("/search", searchSongs);
router.get("/recommendations/:songId", getRecommendations);

module.exports = router;