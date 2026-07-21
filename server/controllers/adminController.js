const Song = require("../models/song");
const User = require("../models/User");
const Favorite = require("../models/Favorite");
const Playlist = require("../models/Playlist");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalFavorites = await Favorite.countDocuments();
    const totalPlaylists = await Playlist.countDocuments();

    res.json({
      totalSongs,
      totalUsers,
      totalFavorites,
      totalPlaylists,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};