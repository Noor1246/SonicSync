const Song = require("../models/song");

const getArtists = async (req, res) => {
  try {
    const songs = await Song.find();

    const artists = {};

    songs.forEach((song) => {
      if (!artists[song.artist]) {
        artists[song.artist] = {
          name: song.artist,
          image: song.artistImage || song.image,
          songs: [],
        };
      }

      artists[song.artist].songs.push(song);
    });

    res.json(Object.values(artists));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getArtistByName = async (req, res) => {
  try {
    const artistName = decodeURIComponent(req.params.name);

    const songs = await Song.find({ artist: artistName });

    if (songs.length === 0) {
      return res.status(404).json({
        message: "Artist not found",
      });
    }

    res.json({
      name: artistName,
      image: songs[0].artistImage || songs[0].image,
      songs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getArtists,
  getArtistByName,
};