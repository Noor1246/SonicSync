import React from "react";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

const VolumeBar = ({
  value,
  min,
  max,
  onChange,
  setVolume,
}) => {
  return (
    <div className="hidden lg:flex items-center justify-end gap-3">

      {/* Volume Icon */}
      <button
        onClick={() =>
          value === 0
            ? setVolume(1)
            : setVolume(0)
        }
        className="
          text-white/80
          hover:text-cyan-400
          transition-all
          duration-300
          hover:scale-110
        "
      >
        {value > 0.5 ? (
          <BsFillVolumeUpFill size={24} />
        ) : value > 0 ? (
          <BsVolumeDownFill size={24} />
        ) : (
          <BsFillVolumeMuteFill size={24} />
        )}
      </button>


      {/* Volume Slider */}
      <div className="relative group">

        <input
  type="range"
  step="0.01"
  value={value}
  min={min}
  max={max}
  onChange={onChange}
  style={{
    background: `linear-gradient(
      to right,
      #22d3ee ${value * 100}%,
      rgba(255,255,255,0.2) ${value * 100}%
    )`,
  }}
  className="
    w-32
    h-1.5
    appearance-none
    rounded-full
    cursor-pointer
    accent-cyan-400
    transition-all
    duration-300
    hover:h-2
  "
/>

      </div>

    </div>
  );
};

export default VolumeBar;