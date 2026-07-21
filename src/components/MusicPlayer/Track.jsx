import React from "react";

const Track = ({
  isPlaying,
  isActive,
  activeSong,
  onExpand,
}) => {

  return (

    <div
      className="
        flex
        items-center

        min-w-0
        flex-1
      "
    >


      {/* Album Artwork */}

      <div
        onClick={onExpand}

        className="
          relative

          h-12
          w-12

          sm:h-16
          sm:w-16

          mr-3
          sm:mr-4

          cursor-pointer

          group

          flex-shrink-0
        "
      >


        {/* Glow */}

        <div
          className={`
            absolute

            -inset-2

            rounded-3xl

            blur-xl

            transition-all

            duration-700

            ${
              isPlaying && isActive
                ? "bg-cyan-400/40 animate-pulse scale-110"
                : "bg-cyan-400/20"
            }

            group-hover:bg-cyan-400/50
          `}
        />



        {/* Reflection */}

        <div
          className="
            absolute
            inset-0

            rounded-2xl

            bg-gradient-to-tr

            from-white/20

            to-transparent

            opacity-0

            group-hover:opacity-100

            transition

            duration-500

            z-10

            pointer-events-none
          "
        />



        {/* Image */}

        <img

          src={activeSong?.image}

          alt={activeSong?.title}

          className={`
  relative

  z-0

  h-12
  w-12

  sm:h-16
  sm:w-16

  rounded-full

  object-cover

  shadow-[0_0_25px_rgba(34,211,238,0.35)]

  transition-all
  duration-500

  group-hover:scale-110

  ${
    isPlaying && isActive
      ? "scale-105 animate-spin-slow"
      : ""
  }
`}
        />

      </div>





      {/* Song Details */}

      <div
        className="
          min-w-0
          max-w-[120px]

          sm:max-w-[180px]

        "
      >

        <div className="flex items-center gap-2">

  <p
    className="
      truncate
      text-white
      font-bold
      text-sm
      sm:text-lg
    "
  >
    {activeSong?.title || "No Active Song"}
  </p>

  {isPlaying && isActive && (
    <div className="flex items-end gap-[2px] h-5">
      <span className="visualizer-bar"></span>
      <span className="visualizer-bar delay-1"></span>
      <span className="visualizer-bar delay-2"></span>
      <span className="visualizer-bar delay-3"></span>
    </div>
  )}

</div>



        <p
          className="
            truncate

            text-gray-300

            text-xs

            sm:text-sm
          "
        >
          {activeSong?.artist || "Unknown Artist"}
        </p>


      </div>


    </div>

  );

};

export default Track;