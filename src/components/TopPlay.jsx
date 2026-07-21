import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import {
  playPause,
  setActiveSong,
} from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className="
      group
      w-full
      flex
      items-center
      gap-3

      rounded-2xl

      px-3
      py-3

      bg-white/5
      border
      border-white/5

      backdrop-blur-xl

      transition-all
      duration-300

      hover:bg-white/10
      hover:border-cyan-400/20
      hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
    "
  >
    <span
      className="
        text-lg
        font-bold
        text-cyan-400
        w-6
      "
    >
      {i + 1}
    </span>

    <img
      src={song.image}
      alt={song.title}
      className="
        h-14
        w-14

        rounded-xl

        object-cover

        transition-all
        duration-300

        group-hover:scale-105
      "
    />

    <div className="flex-1 min-w-0">

      <p className="truncate text-white font-semibold">
        {song.title}
      </p>

      <p className="truncate text-sm text-gray-400">
        {song.artist}
      </p>

    </div>

    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();

  const {
    activeSong,
    isPlaying,
  } = useSelector((state) => state.player);

  const { data = [] } =
    useGetTopChartsQuery();

  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  const topPlays = data.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(
      setActiveSong({
        song,
        data,
        i,
      })
    );

    dispatch(playPause(true));
  };
    return (
    <div
      ref={divRef}
      className="
        w-full
        md:w-[360px]
        xl:w-[340px]

        xl:ml-6
        mb-8
        xl:mb-0

        rounded-3xl

        bg-white/5
        backdrop-blur-2xl

        border
        border-white/10

        p-5

        shadow-[0_0_30px_rgba(34,211,238,0.08)]

        flex
        flex-col
      "
    >

      {/* Top Songs */}

      <div>

        <h2
          className="
            text-white
            text-2xl
            font-bold

            mb-5
          "
        >
          🔥 Top Songs
        </h2>

        <div className="space-y-3">

          {topPlays.map((song, i) => (

            <TopChartCard
              key={song._id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() =>
                handlePlayClick(song, i)
              }
            />

          ))}

        </div>

      </div>



      {/* Artists */}

      <div className="mt-8">

        <h2
          className="
            text-white
            text-2xl
            font-bold

            mb-5
          "
        >
          🎤 Artists
        </h2>

        <Swiper
          freeMode
          modules={[FreeMode]}

          spaceBetween={16}

          breakpoints={{

            320: {
              slidesPerView: 2.3,
            },

            640: {
              slidesPerView: 3,
            },

            768: {
              slidesPerView: 3.5,
            },

            1024: {
              slidesPerView: 4,
            },

          }}
        >

          {topPlays.map((song) => (

            <SwiperSlide key={song._id}>

              <div
                className="
                  flex
                  flex-col
                  items-center

                  cursor-pointer

                  group
                "
              >

                <img
                  src={song.image}
                  alt={song.artist}

                  className="
                    w-20
                    h-20

                    sm:w-24
                    sm:h-24

                    rounded-full

                    object-cover

                    border-2
                    border-transparent

                    transition-all
                    duration-300

                    group-hover:border-cyan-400
                    group-hover:scale-105
                    group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]
                  "
                />

                <p
                  className="
                    mt-3

                    text-center

                    text-white

                    text-sm

                    truncate

                    w-full
                  "
                >
                  {song.artist}
                </p>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </div>
  );
};

export default TopPlay;