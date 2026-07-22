import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import API from "../api";
import { Loader, Error, SongCard } from "../components";

import { getCachedSongs, setCachedSongs } from "../utils/songCache";
const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
  const fetchSongs = async () => {
    try {
      const cached = getCachedSongs();

      if (cached) {
        setSongs(cached);
        setLoading(false);
        return;
      }

      const res = await axios.get(`${API}/api/songs`);

      setSongs(res.data);
      setCachedSongs(res.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  fetchSongs();
}, []);

  if (loading) return <Loader title="Loading Top Charts..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
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
    </div>
  );
};

export default TopCharts;