import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import API_URL from "../api";
import toast from "react-hot-toast";
const AddToPlaylist = ({ song }) => {
  const [playlists, setPlaylists] = useState([]);
  const [show, setShow] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

const user = {
  ...storedUser,
  _id: storedUser?._id || storedUser?.id,
};
  const fetchPlaylists = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
  `${API_URL}/api/playlists/${user._id}`
);

      setPlaylists(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const addSong = async (playlistId) => {
  setShow(false);

  // Show feedback immediately
  toast.success("Added to playlist 🎵");

  try {
    await axios.post(
      `${API_URL}/api/playlists/${playlistId}/add`,
      {
        songId: song._id,
      }
    );
  } catch (err) {
    console.log(err);
    toast.error("Failed to add song.");
  }
};

  const handleCreatePlaylist = async () => {
  if (!user) return;

  const name = prompt("Enter playlist name");

  if (!name || !name.trim()) return;

  try {
    const res = await axios.post(
      `${API_URL}/api/playlists`,
      {
        name,
        user: user._id,
      }
    );

    const newPlaylist = res.data;

    // Update UI immediately
    setPlaylists((prev) => [...prev, newPlaylist]);
    setShow(false);

    toast.success("Playlist created 🎉");

    // Add the song in the background
    axios
      .post(
        `${API_URL}/api/playlists/${newPlaylist._id}/add`,
        {
          songId: song._id,
        }
      )
      .catch(console.log);

  } catch (err) {
    console.log(err);
    toast.error("Failed to create playlist.");
  }
};

  return (
    <div className="relative overflow-visible">

      <button
        onClick={() => setShow(!show)}
        className="
          w-9
          h-9
          rounded-full
          bg-purple-600
          hover:bg-purple-500
          flex
          items-center
          justify-center
          text-white
          transition
        "
      >
        <FaPlus />
      </button>

      {show && (
        <div
          className="
            absolute
            right-0
            bottom-14
            w-52
            bg-[#1b1b2f]
            rounded-xl
            shadow-2xl
            border
            border-white/10
            z-[999]
            py-2
          "
        >
          {playlists.length === 0 ? (
            <p className="text-gray-400 text-sm px-4 py-2">
              No playlists found
            </p>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist._id}
                onClick={() => addSong(playlist._id)}
                className="
                  w-full
                  text-left
                  px-4
                  py-2
                  text-white
                  hover:bg-white/10
                  transition
                "
              >
                {playlist.name}
              </button>
            ))
          )}

          <hr className="my-2 border-white/10" />

          <button
            onClick={handleCreatePlaylist}
            className="
              w-full
              text-left
              px-4
              py-2
              text-cyan-400
              font-semibold
              hover:bg-white/10
              transition
            "
          >
            + Create Playlist
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToPlaylist;