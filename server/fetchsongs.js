const axios = require("axios");
const fs = require("fs");

const genres = [
  "pop",
  "rock",
  "hip hop",
  "r&b",
  "bollywood",
  "punjabi",
  "indie",
  "lofi",
  "jazz",
  "classical",
  "edm",
  "metal",
  "country",
  "tamil songs",
  "telugu songs",
  "kpop",
  "latin",
  "reggae",
  "blues",
  "folk"
];

let songs = [];

async function fetchSongs() {
  try {
    for (let genre of genres) {

      const response = await axios.get(
        "https://itunes.apple.com/search",
        {
          params: {
            term: genre,
            media: "music",
            limit: 50
          }
        }
      );

      const data = response.data.results;

      data.forEach((song) => {
        if (song.previewUrl) {
          songs.push({
            title: song.trackName,
            artist: song.artistName,
            album: song.collectionName,
            image: song.artworkUrl100,
            audio: song.previewUrl,
            duration: "0:30"
          });
        }
      });
    }

    fs.writeFileSync(
      "./data/songs.json",
      JSON.stringify(songs, null, 2)
    );

    console.log(`${songs.length} songs saved 🎵`);

  } catch (error) {
    console.log(error);
  }
}

fetchSongs();