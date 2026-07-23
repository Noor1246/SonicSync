import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import API_URL from "../../api";
import SongSection from "./SongSection";

const MadeForYou = () => {
  const [songs, setSongs] = useState([]);

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) return;

        const userId = storedUser._id || storedUser.id;

        console.log("User:", storedUser);
        console.log("User ID:", userId);

        const res = await axios.get(
          `${API_URL}/api/recommendations/${userId}`
        );

        console.log("Recommendations:", res.data);

        if (Array.isArray(res.data)) {
          setSongs(res.data);
        }
      } catch (err) {
        console.log("Recommendation error:", err);
      }
    };

    fetchRecommendations();
  }, []);

  if (!songs.length) return null;

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