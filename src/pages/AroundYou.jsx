import React from "react";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const country = "IN";

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  const {
    data,
    isFetching,
    error,
  } = useGetSongsByCountryQuery(country);

  if (isFetching)
    return <Loader title="Loading songs around you..." />;

  if (error)
    return <Error />;

  return (
    <div className="flex flex-col">

      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You{" "}
        
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song?.key || song?._id || i}
            song={song}
            data={data}
            i={i}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        ))}
      </div>

    </div>
  );
};

export default AroundYou;