import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import SongSection from "./SongSection";


const MadeForYou = () => {

  const [songs, setSongs] = useState([]);

  const {
    activeSong,
    isPlaying,
  } = useSelector(
    (state) => state.player
  );



  useEffect(() => {
  const fetchRecommendations = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const cacheKey = `recommendations_${user._id}`;

      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        setSongs(JSON.parse(cached));
        return;
      }

      const res = await axios.get(
        `http://localhost:8000/api/recommendations/${user.id}`
      );

      if (Array.isArray(res.data)) {
        setSongs(res.data);

        sessionStorage.setItem(
          cacheKey,
          JSON.stringify(res.data)
        );
      }
    } catch (err) {
      console.log("Recommendation error:", err);
    }
  };

  fetchRecommendations();
}, []);



  if (!songs.length)
    return null;



  return (

    <SongSection

      title="✨ Made For You"

      songs={songs}

      isPlaying={isPlaying}

      activeSong={activeSong}

    />

  );

};


export default MadeForYou;