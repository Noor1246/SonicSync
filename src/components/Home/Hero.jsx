import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlay, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import API_URL from "../../api";
import {
  playPause,
  setActiveSong,
} from "../../redux/features/playerSlice";

const Hero = ({ songs }) => {
  const [featuredSong, setFeaturedSong] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();

  const storedUser = JSON.parse(
  localStorage.getItem("user")
);

const user = {
  ...storedUser,
  _id: storedUser?._id || storedUser?.id,
};

  useEffect(() => {
  if (!songs.length) return;

  const random =
    songs[Math.floor(Math.random() * songs.length)];

  setFeaturedSong(random);
}, [songs]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !featuredSong) return;

      try {
        const res = await axios.get(
  `${API_URL}/api/favorites/check/${user._id}/${featuredSong._id}`
);

        setIsFavorite(res.data.favorite);
      } catch (err) {
        console.log(err);
      }
    };

    checkFavorite();
  }, [featuredSong, user?._id]);

  const handlePlay = async () => {
    if (!featuredSong) return;

    try {
      dispatch(
  setActiveSong({
    song: featuredSong,
    data: songs,
    i: songs.findIndex(
      (song) => song._id === featuredSong._id
    ),
  })
);

dispatch(playPause(true));

      
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorite = async () => {
  if (!user) {
    alert("Please login first");
    return;
  }

  // Instant UI update
  const previous = isFavorite;
  setIsFavorite(!previous);

  try {
    await axios.post(`${API_URL}/api/favorites`, {
      user: user._id,
      song: featuredSong._id,
    });
  } catch (err) {
    // Revert if request fails
    setIsFavorite(previous);

    console.log(
      "FAVORITE ERROR:",
      err.response?.data || err
    );
  }
};

  if (!featuredSong) return null;

  return (
    <div
      className="
        relative
        w-full

        min-h-[240px]
md:h-[280px]
lg:h-[300px]

        rounded-3xl
        overflow-hidden

        mb-8

        border
        border-white/10

        bg-black

        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
      "
    >
      {/* Background */}
      <img
        src={featuredSong.image}
        alt={featuredSong.title}
        className="
          absolute
          inset-0

          w-full
          h-full

          object-cover

          scale-125

          blur-md

          brightness-50

          opacity-60
        "
      />

      {/* Gradient Overlay */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-r

          from-black
          via-black/70
          to-black/10
        "
      />

      {/* Content */}
      <div
  className="
    relative
    z-10

    min-h-full

    flex
    flex-col
    md:flex-row

    items-center
    justify-between

    px-6
    md:px-10

    py-4
    md:py-0
  "
>
        {/* Left */}
        <div
className="
w-full
md:max-w-[60%]

text-center
md:text-left

flex
flex-col
justify-center
"
>

          <p
            className="
              text-cyan-400
              font-bold
              tracking-[0.25em]
              text-xs
              uppercase
            "
          >
            Featured Song
          </p>

          <h1
            className="
              mt-3

              text-2xl
sm:text-3xl
lg:text-4xl

              font-black

              text-white

              leading-tight

              line-clamp-2
            "
          >
            {featuredSong.title}
          </h1>

          <p
            className="
              mt-2

              text-base
              sm:text-lg

              text-gray-300
            "
          >
            {featuredSong.artist}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            {featuredSong.album || "Single"}
          </p>

          <div
            className="
              flex
flex-wrap
justify-center
md:justify-start
gap-3
mt-4
md:mt-6
            "
          >
            <button
              onClick={handlePlay}
              className="
                flex
                items-center
                gap-2

                px-4
py-2
sm:px-5
sm:py-2.5

                rounded-full

                bg-cyan-400

                text-black

                font-bold

                transition-all
                duration-300

                hover:scale-105
                hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]
              "
            >
              <FaPlay />
              Play Now
            </button>

            <button
              onClick={handleFavorite}
              className={`
                flex
                items-center
                gap-2

                px-5
                py-2.5

                rounded-full

                text-white

                transition-all
                duration-300

                ${
                  isFavorite
                    ? "bg-pink-500"
                    : "bg-white/10 hover:bg-white/20 backdrop-blur-xl"
                }
              `}
            >
              <FaHeart />

              {isFavorite ? "Liked" : "Favorite"}
            </button>
          </div>
        </div>
                {/* Right Artwork */}
        <div
          className="
            relative

            hidden
md:flex
items-center
justify-center
flex-shrink-0

            items-center
            justify-center

            flex-shrink-0
          "
        >

          {/* Glow */}
          <div
            className="
              absolute

              w-52
h-52

              rounded-full

              bg-cyan-400/30

              blur-3xl

              animate-pulse
            "
          />


          {/* Album Cover */}
          <img
            src={featuredSong.image}
            alt={featuredSong.title}

            className="
              relative

              w-36
h-36
lg:w-44
lg:h-44

              lg:w-44
              lg:h-44

              rounded-3xl

              object-cover

              border
              border-white/20

              shadow-[0_0_40px_rgba(34,211,238,0.35)]

              transition-all
              duration-700

              hover:scale-110
              hover:rotate-2

              animate-float
            "
          />

        </div>

      </div>

    </div>
  );
};

export default Hero;