const express = require("express");
const router = express.Router();

const {
  createPlaylist,
  getPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} = require("../controllers/playlistController");


// Create playlist
router.post("/", createPlaylist);
router.put("/:id", updatePlaylist);

// Get user playlists
router.get("/:userId", getPlaylists);


// Add song to playlist
router.post("/:playlistId/add", addSongToPlaylist);


// Remove song from playlist
router.delete(
  "/:playlistId/remove/:songId",
  removeSongFromPlaylist
);


// Delete playlist
router.delete("/:id", deletePlaylist);


module.exports = router;