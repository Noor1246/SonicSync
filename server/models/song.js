const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: String,
    image: String,
    artistImage: String,
    audio: String,
    duration: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);