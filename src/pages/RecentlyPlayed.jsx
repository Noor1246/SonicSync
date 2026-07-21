import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import SongCard from "../components/SongCard";

const RecentlyPlayed = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  const fetchRecentlyPlayed = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

const user = {
  ...storedUser,
  _id: storedUser?._id || storedUser?.id,
};

    if (!user) {
      setLoading(false);
      return;
    }

    const res = await axios.get(
      `http://localhost:8000/api/recently-played/${user._id}`
    );

    const recentSongs = res.data
      .map((item) => item.song)
      .filter(Boolean);

    setSongs(recentSongs);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  fetchRecentlyPlayed();
}, [activeSong?._id]);

  if (loading) {
    return (
      <h1 className="text-white text-2xl">
        Loading recently played...
      </h1>
    );
  }

  return (
    <div className="flex flex-col">

      <div className="mb-8">
        <h1 className="text-white font-bold text-3xl">
          Recently Played 🎵
        </h1>

        <p className="text-gray-400 mt-2">
          Jump back into the music you've listened to recently.
        </p>
      </div>

      {songs.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            py-24
            rounded-3xl
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
          "
        >
          <div className="text-6xl mb-5">🎵</div>

          <h2 className="text-white text-2xl font-bold">
            Nothing Played Yet
          </h2>

          <p className="text-gray-400 mt-3 text-center max-w-md">
            Start playing songs and they'll appear here automatically.
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
              key={song?._id}
              song={song}
              data={songs}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyPlayed;