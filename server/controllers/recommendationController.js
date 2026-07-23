const Favorite = require("../models/Favorite");
const RecentlyPlayed = require("../models/RecentlyPlayed");
const Song = require("../models/song");

const getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;

    const favorites = await Favorite.find({
      user: userId,
    }).populate("song");

    const recent = await RecentlyPlayed.find({
      user: userId,
    }).populate("song");

    const artists = new Set();
    const albums = new Set();
    const excludeSongs = new Set();

    favorites.forEach((item) => {
      if (item.song) {
        artists.add(item.song.artist);

        if (item.song.album) {
          albums.add(item.song.album);
        }

        excludeSongs.add(item.song._id.toString());
      }
    });

    recent.forEach((item) => {
      if (item.song) {
        artists.add(item.song.artist);

        if (item.song.album) {
          albums.add(item.song.album);
        }

        excludeSongs.add(item.song._id.toString());
      }
    });

    let recommendations = [];

    // Personalized recommendations
    if (artists.size || albums.size) {
      recommendations = await Song.find({
        _id: {
          $nin: [...excludeSongs],
        },
        $or: [
          {
            artist: {
              $in: [...artists],
            },
          },
          {
            album: {
              $in: [...albums],
            },
          },
        ],
      }).limit(20);
    }

    // Fill with random songs if personalized list is too small
    if (recommendations.length < 8) {
      const randomSongs = await Song.aggregate([
        {
          $match: {
            _id: {
              $nin: [...excludeSongs].map((id) => require("mongoose").Types.ObjectId.createFromHexString(id)),
            },
          },
        },
        {
          $sample: {
            size: 20,
          },
        },
      ]);

      recommendations = [
        ...recommendations,
        ...randomSongs,
      ];
    }

    // Remove duplicates
    const uniqueSongs = [];
    const seen = new Set();

    recommendations.forEach((song) => {
      const id = song._id.toString();

      if (!seen.has(id)) {
        seen.add(id);
        uniqueSongs.push(song);
      }
    });

    // Shuffle & return only 8
    uniqueSongs.sort(() => Math.random() - 0.5);

    res.json(uniqueSongs.slice(0, 8));
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getRecommendations,
};