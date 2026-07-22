import { FaMusic } from "react-icons/fa";

const StartupLoader = () => {
  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        flex-col
        items-center
        justify-center
        bg-gradient-to-br
        from-[#050816]
        via-[#0f172a]
        to-[#111827]
      "
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,.5)]">
          <FaMusic className="text-3xl text-black" />
        </div>

        <h1 className="text-5xl font-black text-white">
          SonicSync
        </h1>
      </div>

      {/* Equalizer */}

      <div className="flex items-end gap-2 h-10 mb-8">

        <span className="bar w-2 h-4 rounded bg-cyan-400 animate-equalizer"></span>
        <span className="bar w-2 h-8 rounded bg-cyan-400 animate-equalizer"></span>
        <span className="bar w-2 h-6 rounded bg-cyan-400 animate-equalizer"></span>
        <span className="bar w-2 h-10 rounded bg-cyan-400 animate-equalizer"></span>
        <span className="bar w-2 h-5 rounded bg-cyan-400 animate-equalizer"></span>

      </div>

      <p className="text-white text-xl font-semibold mb-2">
        Starting SonicSync...
      </p>

      <p className="text-gray-400 text-center max-w-md leading-7">
        The backend is hosted on Render's free tier.
        <br />
        The first visit may take up to <b>30–60 seconds</b> while the server wakes up.
      </p>
    </div>
  );
};

export default StartupLoader;