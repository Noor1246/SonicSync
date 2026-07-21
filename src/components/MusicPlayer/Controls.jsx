import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">


    {/* Repeat */}
    <button
      onClick={() => setRepeat((prev) => !prev)}
      className={`
        hidden sm:block
        transition-all
        duration-300
        hover:scale-125

        ${
          repeat
            ? "text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]"
            : "text-white"
        }
      `}
    >
      <BsArrowRepeat size={20} />
    </button>


    {/* Previous */}
    {currentSongs?.length > 0 && (
      <button
        onClick={handlePrevSong}
        className="
          text-white
          transition
          hover:text-cyan-400
          hover:scale-110
        "
      >
        <MdSkipPrevious size={32} />
      </button>
    )}



    {/* Play / Pause */}
    <button
      onClick={handlePlayPause}
      className="
        relative
        flex
        items-center
        justify-center

        h-12
        w-12

        rounded-full

        bg-white/10
        backdrop-blur-xl

        text-white

        shadow-[0_0_25px_rgba(34,211,238,0.35)]

        transition-all
        duration-300

        hover:scale-110
      "
    >

      {/* Glow */}
      <span
        className={`
          absolute
          inset-0
          rounded-full
          blur-lg
          bg-cyan-400/30

          ${
            isPlaying
              ? "animate-pulse"
              : ""
          }
        `}
      />


      <span className="relative z-10">

        {isPlaying ? (
          <BsFillPauseFill size={30} />
        ) : (
          <BsFillPlayFill size={30} />
        )}

      </span>

    </button>



    {/* Next */}
    {currentSongs?.length > 0 && (
      <button
        onClick={handleNextSong}
        className="
          text-white
          transition
          hover:text-cyan-400
          hover:scale-110
        "
      >
        <MdSkipNext size={32} />
      </button>
    )}



    {/* Shuffle */}
    <button
      onClick={() => setShuffle((prev) => !prev)}
      className={`
        hidden sm:block
        transition-all
        duration-300
        hover:scale-125

        ${
          shuffle
            ? "text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]"
            : "text-white"
        }
      `}
    >
      <BsShuffle size={20} />
    </button>


  </div>
);

export default Controls;
