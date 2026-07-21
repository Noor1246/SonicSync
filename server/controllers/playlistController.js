const Playlist = require("../models/Playlist");


// Create playlist
const createPlaylist = async (req, res) => {
  try {
    const { name, user } = req.body;

    const playlist = await Playlist.create({
      name,
      user,
      songs: [],
    });

    res.status(201).json(playlist);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// Get all playlists of a user
const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({
      user: req.params.userId,
    }).populate("songs");

    res.json(playlists);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// Add song to playlist
const addSongToPlaylist = async (req, res) => {
  try {
    const { songId } = req.body;

    const playlist = await Playlist.findById(
      req.params.playlistId
    );

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }


    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
    }


    await playlist.save();

    res.json(playlist);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};



// Remove song from playlist
const removeSongFromPlaylist = async (req, res) => {
  try {

    const playlist = await Playlist.findById(
      req.params.playlistId
    );


    playlist.songs =
      playlist.songs.filter(
        (id) => id.toString() !== req.params.songId
      );


    await playlist.save();


    res.json({
      message: "Song removed",
    });


  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updatePlaylist = async (req,res)=>{
  try{

    const playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      {
        name:req.body.name
      },
      {
        new:true
      }
    );

    res.json(playlist);

  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }
};
// Delete playlist
const deletePlaylist = async (req, res) => {
  try {

    await Playlist.findByIdAndDelete(
      req.params.id
    );


    res.json({
      message: "Playlist deleted",
    });


  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {
  createPlaylist,
  getPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
