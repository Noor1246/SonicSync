const Song = require("../models/song");

// Get all songs
const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add song
const addSong = async (req, res) => {
  try {

    const {
      title,
      artist,
      album,
      duration,
    } = req.body;


    const image =
      req.files?.image
        ? req.files.image[0].path
        : "";


    const audio =
      req.files?.audio
        ? req.files.audio[0].path
        : "";


    const song = await Song.create({

      title,
      artist,
      album,
      duration,

      image,
      audio,

    });


    res.status(201).json(song);


  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
const searchSongs = async (req, res) => {
  try {
    const query = req.query.query;

    const songs = await Song.find({
      $or: [
        {
          title: {
            $regex: query,
            $options: "i",
          },
        },
        {
          artist: {
            $regex: query,
            $options: "i",
          },
        },
        {
          album: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.json(songs);

  } catch(err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
// Get recommended songs
const getRecommendations = async (req, res) => {
  try {
    const { songId } = req.params;

    const currentSong = await Song.findById(songId);

    if (!currentSong) {
      return res.status(404).json({
        message: "Song not found",
      });
    }


    let recommendations = await Song.find({
      _id: { $ne: songId },
      $or: [
        {
          artist: currentSong.artist,
        },
        {
          album: currentSong.album,
        },
      ],
    }).limit(10);


    // fallback if no similar songs found
    if (recommendations.length < 5) {
      const extraSongs = await Song.find({
        _id: {
          $ne: songId,
          $nin: recommendations.map(song => song._id),
        },
      })
      .sort({ createdAt: -1 })
      .limit(10);


      recommendations = [
        ...recommendations,
        ...extraSongs,
      ];
    }


    res.json(recommendations);


  } catch(err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
// Update song
const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.json(song);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete song
const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.json({
      message: "Song deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getSongs,
  addSong,
  updateSong,
  deleteSong,
  searchSongs,
  getRecommendations,
};