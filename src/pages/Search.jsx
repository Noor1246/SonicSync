import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import SongCard from "../components/SongCard";

const Search = () => {
  const { searchTerm } = useParams();

  const [songs, setSongs] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  // Search Songs
  useEffect(() => {
    const searchSongs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/songs/search?query=${searchTerm}`
        );

        setSongs(res.data);

        const user = JSON.parse(localStorage.getItem("user"));

        if (user && searchTerm?.trim()) {
          await axios.post(
            "http://localhost:8000/api/recent-searches",
            {
              user: user._id,
              query: searchTerm,
            }
          );
        }

        fetchRecentSearches();

      } catch (err) {
        console.log(err);
      }
    };

    if (searchTerm) {
      searchSongs();
    }
  }, [searchTerm]);

  // Fetch Recent Searches
  const fetchRecentSearches = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await axios.get(
        `http://localhost:8000/api/recent-searches/${user._id}`
      );

      setRecentSearches(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  return (
  <div className="w-full">

    {/* Recent Searches */}

    {recentSearches.length > 0 && (

      <div className="mb-10">

        <h2
          className="
            text-white
            text-xl
            sm:text-2xl
            font-bold
            mb-4
          "
        >
          🕒 Recent Searches
        </h2>

        <div className="flex flex-wrap gap-3">

          {recentSearches.map((item) => (

            <button
              key={item._id}
              onClick={() =>
                (window.location.href = `/search/${item.query}`)
              }
              className="
                px-4
                sm:px-5

                py-2

                rounded-full

                bg-white/10
                backdrop-blur-xl

                border
                border-white/10

                text-sm
                sm:text-base

                text-white

                transition-all
                duration-300

                hover:bg-cyan-500
                hover:scale-105
              "
            >
              {item.query}
            </button>

          ))}

        </div>

      </div>

    )}



    {/* Heading */}

    <div className="mb-8">

      <h1
        className="
          text-white

          text-2xl
          sm:text-3xl
          lg:text-4xl

          font-bold

          break-words
        "
      >
        Search Results
      </h1>

      <p
        className="
          mt-2

          text-cyan-400

          text-base
          sm:text-lg

          break-all
        "
      >
        "{searchTerm}"
      </p>

    </div>



    {/* No Results */}

    {songs.length === 0 ? (

      <div
        className="
          flex
          justify-center
          items-center

          py-24

          rounded-3xl

          bg-white/5
          border
          border-white/10
        "
      >

        <p className="text-gray-400 text-lg">
          🎵 No songs found
        </p>

      </div>

    ) : (

      <div
        className="
          grid

          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5

          gap-6
        "
      >

        {songs.map((song, i) => (

          <SongCard
            key={song._id}
            song={song}
            data={songs}
            i={i}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />

        ))}

      </div>

    )}

  </div>
);
};

export default Search;