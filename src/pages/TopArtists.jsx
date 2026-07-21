import { useEffect, useState } from "react";
import { ArtistCard, Loader, Error } from "../components";

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
  const cachedArtists = sessionStorage.getItem("artists");

  if (cachedArtists) {
    setArtists(JSON.parse(cachedArtists));
    setIsFetching(false);
    return;
  }

  fetch("http://localhost:8000/api/artists")
    .then((res) => res.json())
    .then((data) => {
      setArtists(data);

      sessionStorage.setItem(
        "artists",
        JSON.stringify(data)
      );

      setIsFetching(false);
    })
    .catch(() => {
      setError(true);
      setIsFetching(false);
    });
}, []);

  if (isFetching) return <Loader title="Loading artists" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.name}
            track={artist}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
