const RecentlyPlayed = require("../models/RecentlyPlayed");

// Save recently played song
exports.addRecentlyPlayed = async (req, res) => {
  try {
    const { user, song } = req.body;

    // Remove old entry if it exists
    await RecentlyPlayed.findOneAndDelete({
      user,
      song,
    });

    // Save new entry
    const recent = await RecentlyPlayed.create({
      user,
      song,
    });

    res.status(201).json(recent);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get user's recently played songs
exports.getRecentlyPlayed = async (req, res) => {
  try {
    const songs = await RecentlyPlayed.find({
      user: req.params.userId,
    })
      .populate("song")
      .sort({ playedAt: -1 })
      .limit(20);

    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};