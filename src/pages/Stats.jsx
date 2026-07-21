import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMusic,
  FaHeart,
  FaList,
  FaMicrophone,
  FaTrophy,
} from "react-icons/fa";

const Stats = () => {
  const [stats, setStats] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!user) return;

        const res = await axios.get(
          `http://localhost:8000/api/stats/${user._id}`
        );

        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, [user?._id]);

  if (!stats)
    return (
      <h1 className="text-white text-2xl">
        Loading statistics...
      </h1>
    );

  const cards = [
    {
      title: "Songs Played",
      value: stats.songsPlayed,
      icon: <FaMusic size={34} />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Favorites",
      value: stats.favorites,
      icon: <FaHeart size={34} />,
      color: "from-pink-500 to-red-600",
    },
    {
      title: "Playlists",
      value: stats.playlists,
      icon: <FaList size={34} />,
      color: "from-purple-500 to-indigo-600",
    },
  ];

  return (
    <div className="pb-16">

      <div className="mb-10">

        <h1 className="text-5xl font-extrabold text-white">
          Welcome back,
          <span className="text-cyan-400">
            {" "}{user?.name}
          </span>
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Here's your listening summary.
        </p>

      </div>

      {/* Top Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

        {cards.map((card) => (

          <div
            key={card.title}
            className={`bg-gradient-to-r ${card.color}
            rounded-3xl p-8 shadow-2xl
            hover:scale-105 transition-all duration-300`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold text-white mt-3">
                  {card.value}
                </h2>

              </div>

              <div className="text-white">
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Panels */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Top Artists */}

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">

          <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
            <FaMicrophone />
            Top Artists
          </h2>

          {stats.topArtists.map((artist, index) => (

            <div
              key={artist}
              className="flex justify-between py-3 border-b border-white/10"
            >

              <span className="text-gray-300">
                #{index + 1}
              </span>

              <span className="text-white font-semibold">
                {artist}
              </span>

            </div>

          ))}

        </div>

        {/* Top Songs */}

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">

          <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
            <FaTrophy />
            Top Songs
          </h2>

          {stats.topSongs.map((song, index) => (

            <div
              key={song}
              className="flex justify-between py-3 border-b border-white/10"
            >

              <span className="text-gray-300">
                #{index + 1}
              </span>

              <span className="text-white font-semibold">
                {song}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Stats;