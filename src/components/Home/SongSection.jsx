import { useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import SongCard from "../SongCard";


const SongSection = ({
  title,
  songs,
  isPlaying,
  activeSong,
}) => {

  const sliderRef = useRef(null);


  const scroll = (direction) => {
  if (!sliderRef.current) return;

  sliderRef.current.scrollBy({
    left: direction === "left" ? -300 : 300,
    behavior: "smooth",
  });
};



  return (

    <div
      className="
        mb-10
        relative
      "
    >


      {/* Header */}

      <div
        className="
          flex
          justify-between
          items-center
          mb-5
        "
      >

        <h2
          className="
            text-2xl
            font-extrabold
            text-white

            tracking-tight
          "
        >
          {title}
        </h2>



        {/* Navigation */}

        <div
  className="
    hidden
    sm:flex
    gap-3
  "
>

          <button

            onClick={() => scroll("left")}

            className="
              w-10
              h-10

              rounded-full

              bg-white/10

              backdrop-blur-xl

              border
              border-white/10

              text-white

              flex
              items-center
              justify-center

              transition-all

              hover:bg-cyan-400

              hover:text-black

              hover:scale-110
            "
          >

            <FaChevronLeft />

          </button>




          <button

            onClick={() => scroll("right")}

            className="
              w-10
              h-10

              rounded-full

              bg-white/10

              backdrop-blur-xl

              border
              border-white/10

              text-white

              flex
              items-center
              justify-center

              transition-all

              hover:bg-cyan-400

              hover:text-black

              hover:scale-110
            "
          >

            <FaChevronRight />

          </button>


        </div>

      </div>




      {/* Song Carousel */}

      <div
        className="
          relative
        "
      >


        {/* Left fade */}

        <div
          className="
            absolute
            left-0
            top-0
            bottom-4

            w-10

            bg-gradient-to-r
            from-black/40
            to-transparent

            pointer-events-none

            z-10
          "
        />



        <div

          ref={sliderRef}

          className="
  flex
  gap-4
  sm:gap-5

  overflow-x-auto

  scroll-smooth

  pb-4

  snap-x
  snap-mandatory

  scrollbar-hide
"

          style={{

            scrollbarWidth:
              "none",

            msOverflowStyle:
              "none",

          }}

        >

          {
            songs.map(
              (song,index)=>(
                
                <SongCard

                  key={song._id}

                  song={song}

                  data={songs}

                  i={index}

                  isPlaying={isPlaying}

                  activeSong={activeSong}

                />

              )
            )
          }


        </div>


      </div>


    </div>

  );

};


export default SongSection;