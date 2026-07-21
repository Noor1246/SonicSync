import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCachedSongs,
  setCachedSongs,
} from "../utils/songCache";
import { Loader, Error } from "../components";
import Hero from "../components/Home/Hero";
import SongSection from "../components/Home/SongSection";
import MadeForYou from "../components/Home/MadeForYou";
const Discover = () => {
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  const [songs, setSongs] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
  const cached = getCachedSongs();

  if (cached) {
    setSongs(cached);

    const shuffled = [...cached]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    setTrending(shuffled);
    setLoading(false);
    return;
  }

  fetch("http://localhost:8000/api/songs")
    .then((res) => res.json())
    .then((data) => {
      setCachedSongs(data);

      setSongs(data);

      const shuffled = [...data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

      setTrending(shuffled);

      setLoading(false);
    })
    .catch(() => {
      setError(true);
      setLoading(false);
    });
}, []);

  if (loading) return <Loader title="Loading music..." />;

  if (error) return <Error />;

  

  const recentlyAdded = [...songs]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 8);

  return (
    <div className="flex flex-col w-full min-w-0">

      <Hero songs={songs} />

      <SongSection
        title="🔥 Trending"
        songs={trending}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
      <MadeForYou />

      <SongSection
        title="🆕 Recently Added"
        songs={recentlyAdded}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />

      <SongSection
        title="🎶 All Songs"
        songs={songs.slice(0, 20)}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />

    </div>
  );
};

export default Discover;