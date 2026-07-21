import { useDispatch } from "react-redux";
import {
  setActiveSong,
  playPause,
} from "../../redux/features/playerSlice";

const Queue = ({
  currentSongs,
  currentIndex,
  setShowQueue,
}) => {
  const dispatch = useDispatch();

  const handlePlay = (song, index) => {
    dispatch(
      setActiveSong({
        song,
        data: currentSongs,
        i: index,
      })
    );

    dispatch(playPause(true));
  };

  if (!currentSongs.length) return null;

  const currentSong = currentSongs[currentIndex];

  return (
    <div
      className="
        fixed
        right-4
        bottom-28

        w-80
        h-[70vh]

        rounded-3xl

        bg-[#111827]

        border
        border-white/10

        shadow-[0_0_40px_rgba(34,211,238,0.2)]

        z-50

        overflow-hidden

        animate-slideup
      "
    >


      {/* Header */}
      <div
        className="
          sticky
          top-0

          bg-[#111827]

          p-5

          flex
          justify-between
          items-center

          border-b
          border-white/10
        "
      >

        <div>
          <h2 className="text-white text-xl font-bold">
            Queue
          </h2>

          <p className="text-gray-400 text-sm">
            {currentSongs.length} songs
          </p>
        </div>


        <button
          onClick={() => setShowQueue(false)}
          className="
            text-white/60
            hover:text-red-400
            transition
            hover:scale-110
          "
        >
          ✕
        </button>

      </div>



      {/* Current Playing */}
      {currentSong && (
        <div
          className="
            mx-4
            mt-4
            p-3

            rounded-2xl

            bg-cyan-400/10

            border
            border-cyan-400/20

            flex
            items-center
            gap-3
          "
        >

          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="
              w-12
              h-12
              rounded-xl
              object-cover

              shadow-[0_0_15px_rgba(34,211,238,0.5)]
            "
          />

          <div className="overflow-hidden">

            <p className="text-cyan-300 text-xs">
              NOW PLAYING
            </p>

            <h3 className="text-white font-semibold truncate">
              {currentSong.title}
            </h3>

          </div>

        </div>
      )}



      {/* Queue List */}
      <div className="p-3 overflow-y-auto h-[calc(70vh-120px)]">

        {currentSongs.map((song, index) => {

          if (!song || index === currentIndex)
            return null;


          return (
            <div
              key={song._id}
              onClick={() => handlePlay(song,index)}

              className="
                flex
                items-center
                gap-3

                p-3

                rounded-2xl

                cursor-pointer

                transition-all

                hover:bg-white/10

                hover:scale-[1.02]

                mb-2
              "
            >

              <img
                src={song.image}
                alt={song.title}

                className="
                  w-14
                  h-14
                  rounded-xl
                  object-cover
                "
              />


              <div className="flex-1 overflow-hidden">

                <h3
                  className="
                    text-white
                    font-semibold
                    truncate
                  "
                >
                  {song.title}
                </h3>


                <p
                  className="
                    text-gray-400
                    text-sm
                    truncate
                  "
                >
                  {song.artist}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Queue;