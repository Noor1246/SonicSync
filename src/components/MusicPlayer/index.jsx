import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  nextSong,
  prevSong,
  playPause,
  clearSong,
} from "../../redux/features/playerSlice";

import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";
import Queue from "./Queue";
import Visualizer from "./Visualizer";

import { IoClose } from "react-icons/io5";
import { MdQueueMusic } from "react-icons/md";
console.log("MusicPlayer rendered");
const MusicPlayer = () => {
  const {
    activeSong,
    currentSongs,
    currentIndex,
    isActive,
    isPlaying,
  } = useSelector((state) => state.player);

  const dispatch = useDispatch();

  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);

  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const [showQueue, setShowQueue] = useState(false);
useEffect(() => {
  console.log("Queue State:", showQueue);
}, [showQueue]);
  useEffect(() => {
    if (currentSongs.length) {
      dispatch(playPause(true));
    }
  }, [currentIndex, dispatch]);

  const handlePlayPause = () => {
    if (!isActive) return;
    dispatch(playPause(!isPlaying));
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (shuffle) {
      dispatch(
        nextSong(Math.floor(Math.random() * currentSongs.length))
      );
    } else {
      dispatch(
        nextSong((currentIndex + 1) % currentSongs.length)
      );
    }
  };

  const handlePrevSong = () => {
    if (shuffle) {
      dispatch(
        prevSong(Math.floor(Math.random() * currentSongs.length))
      );
    } else if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
<>
  <div
    className="
      relative
      w-full
      flex
      items-center
      justify-between

      gap-2

      px-3
      sm:px-8
    "
  >

    {/* Close */}
    <button
      onClick={() => dispatch(clearSong())}
      className="
        absolute
        -top-3
        right-2

        z-30

        text-white/70

        hover:text-red-400

        transition
      "
    >
      <IoClose size={20}/>
    </button>



    {/* Left Track */}

    <div
      className="
        flex
        items-center

        flex-1

        min-w-0

        gap-2
        sm:gap-5
      "
    >

      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      />


      {/* Hide visualizer on mobile */}
      <div className="hidden md:block">
        <Visualizer
          isPlaying={isPlaying}
        />
      </div>


    </div>





    {/* Center */}

    <div
      className="
        flex
        flex-col
        items-center
        justify-center

        flex-1

        gap-1
      "
    >

      <Controls
        isPlaying={isPlaying}
        isActive={isActive}
        repeat={repeat}
        setRepeat={setRepeat}
        shuffle={shuffle}
        setShuffle={setShuffle}
        currentSongs={currentSongs}
        handlePlayPause={handlePlayPause}
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
      />


      {/* Hide seekbar on very small screens */}
      <div className="hidden sm:block">

        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(e)=>setSeekTime(e.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />

      </div>


      <Player
        activeSong={activeSong}
        volume={volume}
        isPlaying={isPlaying}
        seekTime={seekTime}
        repeat={repeat}
        currentIndex={currentIndex}
        onEnded={handleNextSong}
        onTimeUpdate={(e)=>
          setAppTime(e.target.currentTime)
        }
        onLoadedData={(e)=>
          setDuration(e.target.duration)
        }
      />

    </div>





    {/* Right */}

    <div
      className="
        flex
        items-center

        gap-2

        sm:gap-4
      "
    >


      {/* Queue always visible */}

      <button
        onClick={() =>
          setShowQueue(prev=>!prev)
        }

        className="
          h-9
          w-9

          rounded-full

          bg-white/10

          text-white

          flex
          items-center
          justify-center

          hover:text-cyan-400

          transition
        "
      >

        <MdQueueMusic size={22}/>

      </button>



      {/* Volume desktop only */}

      <div className="hidden lg:block">

        <VolumeBar
          value={volume}
          min="0"
          max="1"
          onChange={(e)=>
            setVolume(e.target.value)
          }
          setVolume={setVolume}
        />

      </div>


    </div>


  </div>



  {
    showQueue && (
      <Queue
        currentSongs={currentSongs}
        currentIndex={currentIndex}
        setShowQueue={setShowQueue}
      />
    )
  }

</>
);
};

export default MusicPlayer;