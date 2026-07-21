import React from "react";

const Seekbar = ({
  value,
  min,
  max,
  onInput,
  setSeekTime,
  appTime,
}) => {

  // converts time to 0:00 format
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  const progress =
    max > 0 ? (value / max) * 100 : 0;


  return (
    <div className="hidden sm:flex items-center flex-1 justify-center">

      {/* Back 5 sec */}
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="
          hidden lg:block
          mr-4
          text-white/70
          hover:text-cyan-400
          transition
          hover:scale-110
        "
      >
        -5
      </button>


      {/* Current Time */}
      <p className="text-white/80 text-sm w-10 text-center">
        {value === 0 ? "0:00" : getTime(value)}
      </p>


      {/* Slider */}
      <div className="relative group mx-4 flex-1">

        <input
          type="range"
          step="any"
          value={value}
          min={min}
          max={max}
          onInput={onInput}
          style={{
            background: `linear-gradient(
              to right,
              #22d3ee ${progress}%,
              rgba(255,255,255,0.18) ${progress}%
            )`,
          }}
          className="
            w-full
            h-1.5
            appearance-none
            rounded-full
            cursor-pointer

            transition-all
            duration-300

            group-hover:h-2
          "
        />

      </div>


      {/* Duration */}
      <p className="text-white/80 text-sm w-10 text-center">
        {max === 0 ? "0:00" : getTime(max)}
      </p>


      {/* Forward 5 sec */}
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="
          hidden lg:block
          ml-4
          text-white/70
          hover:text-cyan-400
          transition
          hover:scale-110
        "
      >
        +5
      </button>

    </div>
  );
};

export default Seekbar;