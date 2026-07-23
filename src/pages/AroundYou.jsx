import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const country = "IN";

  const [visibleSongs, setVisibleSongs] = useState(20);
  const [selectedGenre, setSelectedGenre] = useState("Bollywood");

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  const {
    data = [],
    isFetching,
    error,
  } = useGetSongsByCountryQuery(country);

  if (isFetching)
    return <Loader title="Loading songs around you..." />;

  if (error) return <Error />;

  const genreMap = {
    Bollywood: [
      "arijit",
      "pritam",
      "shreya",
      "atif",
      "jubin",
      "armaan malik",
      "sonu nigam",
      "rahat",
      "vishal",
    ],

    Punjabi: [
      "diljit",
      "karan aujla",
      "ap dhillon",
      "sidhu",
      "guru randhawa",
      "harrdy",
      "badshah",
    ],

    Pop: [
      "ed sheeran",
      "dua lipa",
      "taylor",
      "justin",
      "weeknd",
      "bruno",
      "selena",
      "charlie puth",
    ],

    Rock: [
      "coldplay",
      "imagine dragons",
      "linkin park",
      "queen",
      "nirvana",
    ],

    LoFi: [
      "lofi",
      "lo-fi",
      "study",
      "sleep",
      "relax",
      "chill",
    ],
  };

  const filteredSongs = data.filter((song) => {
    const text = `${song.title} ${song.artist}`.toLowerCase();

    return genreMap[selectedGenre].some((keyword) =>
      text.includes(keyword)
    );
  });

  return (
    <div className="flex flex-col">

      <h2 className="font-bold text-3xl text-white text-left mt-4">
        Around You 🇮🇳
      </h2>

      <p className="text-gray-400 mt-2 mb-6">
        Explore songs by category.
      </p>

      {/* Genre Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-6 hide-scrollbar">

        {Object.keys(genreMap).map((genre) => (

          <button
            key={genre}
            onClick={() => {
              setSelectedGenre(genre);
              setVisibleSongs(20);
            }}
            className={`
              px-5
              py-2

              rounded-full

              whitespace-nowrap

              transition-all
              duration-300

              ${
                selectedGenre === genre
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }
            `}
          >
            {genre}
          </button>

        ))}

      </div>

      {/* Songs */}
      <div
        className="
          flex
          flex-wrap
          justify-center
          sm:justify-start
          gap-4
          sm:gap-8
        "
      >
        {filteredSongs
          .slice(0, visibleSongs)
          .map((song, i) => (
            <SongCard
              key={song?._id || song?.key || i}
              song={song}
              data={filteredSongs}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
            />
          ))}
      </div>

      {/* Load More */}
      {visibleSongs < filteredSongs.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() =>
              setVisibleSongs((prev) => prev + 20)
            }
            className="
              px-6
              py-3

              rounded-full

              bg-cyan-500

              hover:bg-cyan-400

              text-white
              font-semibold

              transition-all
              duration-300

              hover:scale-105
            "
          >
            Load More Songs
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredSongs.length === 0 && (
        <div className="text-center py-20">

          <h2 className="text-2xl text-white font-bold">
            No songs found
          </h2>

          <p className="text-gray-400 mt-3">
            Try another category.
          </p>

        </div>
      )}

    </div>
  );
};

export default AroundYou;