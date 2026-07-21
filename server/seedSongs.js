const mongoose = require("mongoose");
const Song = require("./models/Song");
const songs = require("./data/songs.json");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Song.deleteMany({});
    await Song.insertMany(songs);

    console.log("Songs seeded successfully!");
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit();
  });