import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Error, Loader, RelatedSongs } from "../components";

import {
  setActiveSong,
  playPause,
} from "../redux/features/playerSlice";


const SongDetails = () => {

  const dispatch = useDispatch();

  const { songid } = useParams();

  const {
    activeSong,
    isPlaying,
  } = useSelector(
    (state) => state.player
  );


  const [songData, setSongData] = useState(null);
  const [relatedSongs, setRelatedSongs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);



  useEffect(() => {

    const fetchSongDetails = async () => {

      try {

        const songRes = await axios.get(
          `http://localhost:8000/api/songs`
        );


        const song = songRes.data.find(
          (item) => item._id === songid
        );


        if (!song) {
          setError(true);
          return;
        }


        setSongData(song);



        const relatedRes = await axios.get(
          `http://localhost:8000/api/songs/recommendations/${songid}`
        );


        setRelatedSongs(
          relatedRes.data
        );


      } catch (err) {

        console.log(err);

        setError(true);

      } finally {

        setLoading(false);

      }

    };


    fetchSongDetails();


  }, [songid]);




  const handlePauseClick = () => {

    dispatch(
      playPause(false)
    );

  };



  const handlePlayClick = (song, i) => {

    dispatch(
      setActiveSong({
        song,
        data: relatedSongs,
        i,
      })
    );


    dispatch(
      playPause(true)
    );

  };



  if (loading)
    return (
      <Loader title="Loading song details..." />
    );



  if (error || !songData)
    return <Error />;



  return (

    <div className="flex flex-col">


      {/* Song Header */}

      <div
        className="
        flex
        flex-col
        md:flex-row
        gap-8
        items-center
        mb-10
        "
      >


        <img
          src={
            songData.image?.startsWith("http")
              ? songData.image
              : `http://localhost:8000${songData.image}`
          }
          alt={songData.title}
          className="
          w-56
          h-56
          rounded-3xl
          object-cover
          "
        />



        <div>

          <h1
            className="
            text-white
            text-4xl
            font-bold
            "
          >
            {songData.title}
          </h1>


          <p
            className="
            text-cyan-400
            text-xl
            mt-3
            "
          >
            {songData.artist}
          </p>


          <p
            className="
            text-gray-400
            mt-2
            "
          >
            {songData.album}
          </p>


        </div>


      </div>





      {/* Related Songs */}

      <div>

        <h2
          className="
          text-white
          text-3xl
          font-bold
          mb-6
          "
        >
          Related Songs 🎵
        </h2>


        <RelatedSongs

          data={relatedSongs}

          isPlaying={isPlaying}

          activeSong={activeSong}

          handlePauseClick={
            handlePauseClick
          }

          handlePlayClick={
            handlePlayClick
          }

        />


      </div>



    </div>

  );

};


export default SongDetails;