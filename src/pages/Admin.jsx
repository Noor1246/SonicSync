import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_URL from "../api";

const Admin = () => {
  const token = localStorage.getItem("token");
  const [songs, setSongs] = useState([]);
  const [stats, setStats] = useState({
    totalSongs: 0,
    totalUsers: 0,
    totalFavorites: 0,
    totalPlaylists: 0,
  });
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");

  // Upload files
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editArtist, setEditArtist] = useState("");
  const [editAlbum, setEditAlbum] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editAudio, setEditAudio] = useState("");

  const fetchSongs = async () => {
    try {
      const res = await axios.get(
 `${API_URL}/api/songs`,
 {
   headers:{
     Authorization:`Bearer ${token}`,
   },
 }
);

      setSongs(res.data);

    } catch (err) {
      console.error(err);
    }
  };
  const fetchStats = async () => {
    try {
        const res = await axios.get(
 `${API_URL}/api/admin/stats`,
 {
   headers:{
     Authorization:`Bearer ${token}`,
   },
 }
);

        setStats(res.data);

    } catch (err) {
        console.log(err);
    }
};

  useEffect(() => {
    fetchSongs();
    fetchStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("album", album);

      if (image) {
        formData.append("image", image);
      }

      if (audio) {
        formData.append("audio", audio);
      }

      await axios.post(
  `${API_URL}/api/songs`,
  formData,
  {
    headers:{
      "Content-Type":"multipart/form-data",
      Authorization:`Bearer ${token}`,
    },
  }
);

      toast.success("Song uploaded successfully!");

      setTitle("");
      setArtist("");
      setAlbum("");

      setImage(null);
      setAudio(null);

      fetchSongs();

    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  const startEditing = (song) => {
    setEditingId(song._id);

    setEditTitle(song.title);
    setEditArtist(song.artist);
    setEditAlbum(song.album);
    setEditImage(song.image);
    setEditAudio(song.audio);
  };

  const updateSong = async () => {
    try {

      await axios.put(
  `${API_URL}/api/songs/${editingId}`,
  {
    title: editTitle,
    artist: editArtist,
    album: editAlbum,
    image: editImage,
    audio: editAudio,
  },
  {
    headers:{
      Authorization:`Bearer ${token}`,
    },
  }
);
      
      toast.success("Song updated successfully!");
      

      setEditingId(null);

      fetchSongs();

    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  const deleteSong = async (id) => {
    if (!window.confirm("Delete this song?"))
      return;

    try {

      await axios.delete(
 `${API_URL}/api/songs/${id}`,
 {
   headers:{
     Authorization:`Bearer ${token}`,
   },
 }
);

      fetchSongs();

      toast.success("Song deleted successfully!");

    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] p-10">

      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6">
    <h3 className="text-white">🎵 Songs</h3>

    <p className="text-4xl font-bold text-white mt-2">
      {stats.totalSongs}
    </p>
  </div>

  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6">
    <h3 className="text-white">👤 Users</h3>

    <p className="text-4xl font-bold text-white mt-2">
      {stats.totalUsers}
    </p>
  </div>

  <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6">
    <h3 className="text-white">❤️ Favorites</h3>

    <p className="text-4xl font-bold text-white mt-2">
      {stats.totalFavorites}
    </p>
  </div>

  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6">
    <h3 className="text-white">📂 Playlists</h3>

    <p className="text-4xl font-bold text-white mt-2">
      {stats.totalPlaylists}
    </p>
  </div>

</div>

      <div className="bg-[#1d1d1d] rounded-xl p-6 mb-10">

        <h2 className="text-white text-2xl font-bold mb-5">
          All Songs
        </h2>

        {songs.map((song) => (

          <div
            key={song._id}
            className="flex items-center justify-between bg-[#2b2b2b] rounded-lg p-4 mb-4"
          >

            <div className="flex items-center gap-4">

              <img
                src={
                  song.image?.startsWith("http")
                    ? song.image
                    : `${API_URL}${song.image}`
                }
                alt={song.title}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div>

                <h3 className="text-white font-bold">
                  {song.title}
                </h3>

                <p className="text-gray-400">
                  {song.artist}
                </p>

                <p className="text-gray-500 text-sm">
                  {song.album}
                </p>

              </div>

            </div>
                        <div className="flex gap-3">

              <button
                onClick={() => startEditing(song)}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-white"
              >
                Edit
              </button>

              <button
                onClick={() => deleteSong(song._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {editingId && (

        <div className="bg-[#1d1d1d] rounded-xl p-8 mb-10 max-w-xl mx-auto space-y-4">

          <h2 className="text-white text-3xl font-bold text-center">
            Edit Song
          </h2>

          <input
            className="w-full p-3 rounded bg-black text-white"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Song Title"
          />

          <input
            className="w-full p-3 rounded bg-black text-white"
            value={editArtist}
            onChange={(e) => setEditArtist(e.target.value)}
            placeholder="Artist"
          />

          <input
            className="w-full p-3 rounded bg-black text-white"
            value={editAlbum}
            onChange={(e) => setEditAlbum(e.target.value)}
            placeholder="Album"
          />

          <input
            className="w-full p-3 rounded bg-black text-white"
            value={editImage}
            onChange={(e) => setEditImage(e.target.value)}
            placeholder="Image URL"
          />

          <input
            className="w-full p-3 rounded bg-black text-white"
            value={editAudio}
            onChange={(e) => setEditAudio(e.target.value)}
            placeholder="Audio URL"
          />

          <div className="flex gap-4">

            <button
              onClick={updateSong}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Update Song
            </button>

            <button
              onClick={() => setEditingId(null)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </div>

      )}

      <form
        onSubmit={handleSubmit}
        className="bg-[#1d1d1d] rounded-xl p-8 max-w-xl mx-auto space-y-4"
      >

        <h2 className="text-white text-3xl font-bold text-center">
          Upload Song
        </h2>

        <input
          className="w-full p-3 rounded bg-black text-white"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-black text-white"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-black text-white"
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />

        <div>
          <label className="block text-white mb-2">
            Upload Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full text-white"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />
        </div>

        <div>
          <label className="block text-white mb-2">
            Upload MP3 File
          </label>

          <input
            type="file"
            accept="audio/*"
            className="w-full text-white"
            onChange={(e) =>
              setAudio(e.target.files[0])
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Upload Song
        </button>

      </form>

    </div>
  );
};

export default Admin;