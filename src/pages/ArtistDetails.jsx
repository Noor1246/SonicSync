import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loader, Error, SongCard } from "../components";

const ArtistDetails = () => {
  const { id } = useParams();

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/artists/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtist(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader title="Loading artist..." />;

  if (!artist) return <Error />;

  return (
    <div className="flex flex-col">

      <div className="flex items-center gap-8 mb-10">

        <img
          src={artist.image}
          alt={artist.name}
          className="w-48 h-48 rounded-full object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold text-white">
            {artist.name}
          </h1>

          <p className="text-gray-400 mt-2">
            {artist.songs.length} songs
          </p>
        </div>

      </div>

      <div className="flex flex-wrap gap-6">

        {artist.songs.map((song, index) => (
          <SongCard
            key={song._id}
            song={song}
            data={artist.songs}
            i={index}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}

      </div>

    </div>
  );
};

export default ArtistDetails;