import { loader } from "../assets";

const Loader = ({ title }) => (
  <div
    className="
      w-full
      min-h-[60vh]

      flex
      flex-col
      items-center
      justify-center

      px-6
      text-center
    "
  >
    {/* Animated Glow */}
    <div className="relative">

      <div
        className="
          absolute
          inset-0

          rounded-full

          bg-cyan-400/30

          blur-3xl

          animate-pulse
        "
      />

      <img
        src={loader}
        alt="Loading"
        className="
          relative
          w-28
          h-28
          sm:w-36
          sm:h-36

          animate-spin
        "
      />

    </div>

    {/* Equalizer */}

    <div className="flex gap-1 mt-8 h-8 items-end">

      {[...Array(7)].map((_, i) => (

        <div
          key={i}
          className="w-1.5 bg-cyan-400 rounded-full animate-bounce"
          style={{
            height: `${12 + i * 4}px`,
            animationDelay: `${i * 0.1}s`,
          }}
        />

      ))}

    </div>

    <h2
      className="
        text-white

        font-bold

        text-xl
        sm:text-2xl

        mt-8
      "
    >
      {title || "Loading Music..."}
    </h2>

    <p
      className="
        text-gray-400

        mt-2

        text-sm
        sm:text-base
      "
    >
      Preparing your listening experience...
    </p>
  </div>
);

export default Loader;
