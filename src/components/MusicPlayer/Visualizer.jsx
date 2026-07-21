import React from "react";

const Visualizer = ({ isPlaying }) => {
  const bars = Array.from({ length: 24 });

  return (
    <div
      className={`
        flex
        items-end
        gap-[3px]
        h-10
        transition-all
        duration-500

        ${
          isPlaying
            ? "opacity-100"
            : "opacity-40"
        }
      `}
    >

      {bars.map((_, index) => (
        <div
          key={index}
          className={`
            w-[3px]
            rounded-full

            bg-gradient-to-t
            from-cyan-400
            to-blue-500

            shadow-[0_0_8px_rgba(34,211,238,0.8)]

            transition-all

            ${
              isPlaying
                ? "animate-equalizer"
                : ""
            }
          `}
          style={{
            height: `${8 + Math.sin(index * 1.8) * 12 + 18}px`,
            animationDelay: `${index * 0.06}s`,
          }}
        />
      ))}

    </div>
  );
};

export default Visualizer;