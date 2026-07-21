import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import SongCard from "../components/SongCard";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  const user = JSON.parse(localStorage.getItem("user"));


  const fetchPlaylists = async () => {
    try {
      if (!user) return;

      const res = await axios.get(
        `http://localhost:8000/api/playlists/${user._id}`
      );

      setPlaylists(res.data);

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchPlaylists();
  }, []);


  const renamePlaylist = async (playlistId) => {
    const newName = prompt("Enter new playlist name");

    if (!newName) return;

    try {
        await axios.put(
            `http://localhost:8000/api/playlists/${playlistId}`,
        {
            name: newName,
        }
        );

        fetchPlaylists();

    } catch(err) {
        console.log(err);
    }
  };
  const deletePlaylist = async (playlistId) => {

    const confirmDelete = window.confirm(
        "Delete this playlist?"
    );

    if (!confirmDelete) return;


    try {

        await axios.delete(
            `http://localhost:8000/api/playlists/${playlistId}`
        );

        fetchPlaylists();

    } catch(err) {
        console.log(err);
    }

  };
  const removeSong = async (playlistId, songId) => {
    try {

      await axios.delete(
        `http://localhost:8000/api/playlists/${playlistId}/remove/${songId}`
      );

      fetchPlaylists();

    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div>

      <h1 className="text-white text-3xl font-bold mb-8">
        Your Playlists 📂
      </h1>


      {playlists.length === 0 ? (

        <p className="text-gray-400">
          No playlists yet
        </p>

      ) : (

        playlists.map((playlist) => (

          <div
            key={playlist._id}
            className="mb-12"
          >

           <div className="flex items-center justify-between mb-5">

  <h2 className="text-white text-2xl font-bold">
    {playlist.name}
  </h2>

  <div className="flex gap-3">

    <button
      onClick={() => renamePlaylist(playlist._id)}
      className="
        w-10
        h-10
        rounded-full
        bg-blue-600
        hover:bg-blue-500
        flex
        items-center
        justify-center
        text-white
        transition
      "
    >
      <FaEdit />
    </button>

    <button
      onClick={() => deletePlaylist(playlist._id)}
      className="
        w-10
        h-10
        rounded-full
        bg-red-600
        hover:bg-red-500
        flex
        items-center
        justify-center
        text-white
        transition
      "
    >
      <FaTrash />
    </button>

  </div>

</div>


            {playlist.songs.length === 0 ? (

              <p className="text-gray-400">
                No songs in this playlist
              </p>

            ) : (

              <div className="flex flex-wrap gap-8">

                {playlist.songs.map((song, i) => (

                  <div key={song._id}>

                    <SongCard
                      song={song}
                      data={playlist.songs}
                      i={i}
                      activeSong={activeSong}
                      isPlaying={isPlaying}
                    />


                    <button
                      onClick={() =>
                        removeSong(
                          playlist._id,
                          song._id
                        )
                      }
                      className="
mt-2
w-full
py-2
rounded-xl
bg-red-600
hover:bg-red-500
text-white
font-medium
transition
"
                    >
                      ❌ Remove
                    </button>


                  </div>

                ))}

              </div>

            )}

          </div>

        ))

      )}

    </div>
  );
};


export default Playlists;