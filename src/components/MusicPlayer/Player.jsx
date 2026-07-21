/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";
import axios from "axios";
const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const ref = useRef(null);
const lastSongId = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isPlaying) {
      ref.current.play().catch((err) => console.log(err));
    } else {
      ref.current.pause();
    }
  }, [isPlaying, activeSong]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);
  useEffect(() => {
  const saveRecentlyPlayed = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

const user = {
  ...storedUser,
  _id: storedUser?._id || storedUser?.id,
};

if (!user?._id || !activeSong?._id) return;

    // Prevent duplicate saves for the same song
    if (lastSongId.current === activeSong._id) return;

    lastSongId.current = activeSong._id;

    try {
      await axios.post(
        "http://localhost:8000/api/recently-played",
        {
          user: user._id,
          song: activeSong._id,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  saveRecentlyPlayed();
}, [activeSong?._id]);
  

  return (
    <audio
      ref={ref}
      src={
        activeSong?.audio?.startsWith("http")
          ? activeSong.audio
          : `http://localhost:8000${activeSong?.audio}`
      }
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;