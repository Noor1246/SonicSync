import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import {
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

import AddToPlaylist from "./AddToPlaylist";
import PlayPause from "./PlayPause";

import {
  playPause,
  setActiveSong,
} from "../redux/features/playerSlice";

const SongCard = ({
  song,
  isPlaying,
  activeSong,
  data,
  i,
}) => {
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] =
    useState(false);

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const user = {
  ...storedUser,
  _id: storedUser?._id || storedUser?.id,
};

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user) return;

      try {
        const res = await axios.get(
          `http://localhost:8000/api/favorites/check/${user._id}/${song._id}`
        );

        setIsFavorite(res.data.favorite);
      } catch (err) {
        console.log(err);
      }
    };

    checkFavorite();
  }, [song._id]);

  const handleFavorite = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/favorites",
        {
          user: user._id,
          song: song._id,
        }
      );

      setIsFavorite(res.data.favorite);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(
      setActiveSong({
        song,
        data,
        i,
      })
    );

    dispatch(playPause(true));
  };

  const isCurrentSong =
    activeSong?._id === song._id;

  return (
    <div
      className={`
        relative
        group
        flex
        flex-col

        min-w-[210px]
        w-[210px]

        rounded-3xl

        overflow-hidden

        bg-white/10
        backdrop-blur-xl

        border

        transition-all
        duration-500

        hover:-translate-y-2
        hover:shadow-[0_0_40px_rgba(34,211,238,.35)]

        ${
          isCurrentSong
            ? "border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,.35)]"
            : "border-white/10 shadow-2xl"
        }
      `}
    >

      {/* Shine Effect */}

      <div
        className="
          absolute
          -left-32
          top-0
          h-full
          w-20
          rotate-12
          bg-white/20
          blur-xl
          opacity-0
          group-hover:opacity-100
          group-hover:left-[120%]
          transition-all
          duration-1000
          pointer-events-none
          z-20
        "
      />

      {/* Active Border */}

      {isCurrentSong && (
        <div
          className="
            absolute
            inset-0
            rounded-3xl
            border-2
            border-cyan-400
            animate-pulse
            pointer-events-none
            z-10
          "
        />
      )}

      {/* Image */}

      <div
        className="
          relative
          w-full
          h-48
          overflow-hidden
          rounded-t-3xl
          group
        "
      >

        <img
          src={
            song.image?.startsWith("http")
              ? song.image
              : `http://localhost:8000${song.image}`
          }
          alt={song.title}
          className={`
            w-full
            h-full
            object-cover
            transition-all
            duration-700
            group-hover:scale-110

            ${
              isCurrentSong && isPlaying
                ? "scale-105 animate-spin-slow"
                : ""
            }
          `}
        />

        {isCurrentSong && isPlaying && (
          <div
            className="
              absolute
              top-3
              left-3

              px-3
              py-1

              rounded-full

              bg-cyan-400/20

              backdrop-blur-md

              border
              border-cyan-300/30

              text-cyan-300

              text-xs

              font-semibold

              animate-pulse
            "
          >
            ♪ Playing
          </div>
        )}

        <div
          className={`
            absolute
            inset-0

            bg-black/50

            flex
            justify-center
            items-center

            transition-all
            duration-300

            ${
              isCurrentSong
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }
          `}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
      </div>
            {/* Song Details */}

      <div className="p-4 flex flex-col flex-1">

        <h2
          className="
            text-white
            text-lg
            font-bold
            truncate
          "
        >
          {song.title}
        </h2>

        <p
          className="
            text-cyan-300
            text-sm
            truncate
            mt-1
          "
        >
          {song.artist}
        </p>

        <p
          className="
            text-gray-400
            text-xs
            truncate
            mt-1
          "
        >
          {song.album || "Single"}
        </p>

        {/* Bottom Actions */}

        <div
          className="
            flex
            items-center
            justify-between
            mt-5
          "
        >

          {/* Playing Indicator */}

          <div>

            {isCurrentSong && isPlaying ? (

              <div className="flex items-end gap-1 h-5">

                <span className="bar w-[3px] h-3 rounded-full bg-cyan-400 animate-equalizer"></span>

                <span className="bar w-[3px] h-5 rounded-full bg-cyan-400 animate-equalizer"></span>

                <span className="bar w-[3px] h-4 rounded-full bg-cyan-400 animate-equalizer"></span>

                <span className="bar w-[3px] h-5 rounded-full bg-cyan-400 animate-equalizer"></span>

              </div>

            ) : (

              <span className="text-xs text-gray-500">
                
              </span>

            )}

          </div>

          {/* Buttons */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <button
              onClick={handleFavorite}
              className={`
                text-xl
                transition-all
                duration-300
                hover:scale-125

                ${
                  isFavorite
                    ? "text-pink-500 animate-heartbeat drop-shadow-[0_0_12px_rgba(236,72,153,.8)]"
                    : "text-gray-300 hover:text-pink-500"
                }
              `}
            >
              {isFavorite ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}
            </button>

            <AddToPlaylist song={song} />

          </div>

        </div>

      </div>

    </div>

  );

};

export default SongCard;