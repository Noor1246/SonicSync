const Favorite = require("../models/Favorite");
const RecentlyPlayed = require("../models/RecentlyPlayed");
const Playlist = require("../models/Playlist");


const getStats = async (req, res) => {

  try {

    const userId = req.params.userId;


    const favorites = await Favorite.find({
      user: userId
    }).populate("song");


    const recent = await RecentlyPlayed.find({
      user: userId
    })
    .populate("song")
    .sort({
      playedAt: -1
    });


    const playlists = await Playlist.find({
      user: userId
    });



    // Top Artists
    const artistCount = {};


    recent.forEach((item) => {

      if (item.song) {

        artistCount[item.song.artist] =
          (artistCount[item.song.artist] || 0) + 1;

      }

    });



    const topArtists = Object.entries(artistCount)

      .sort((a, b) => b[1] - a[1])

      .slice(0, 5)

      .map(([artist]) => artist);




    // Most Played Songs
    const songCount = {};


    recent.forEach((item) => {

      if (item.song) {

        songCount[item.song.title] =
          (songCount[item.song.title] || 0) + 1;

      }

    });



    const topSongs = Object.entries(songCount)

      .sort((a, b) => b[1] - a[1])

      .slice(0, 5)

      .map(([song]) => song);




    res.json({

      songsPlayed: recent.length,

      favorites: favorites.length,

      playlists: playlists.length,

      topArtist: topArtists[0] || "N/A",

      mostPlayed: topSongs[0] || "N/A",

      topArtists,

      topSongs

    });



  } catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};



module.exports = {
  getStats
};