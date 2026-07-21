import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import SongCard from "../components/SongCard";

const Favorites = () => {

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );


  const fetchFavorites = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );


      if (!user) {
        setLoading(false);
        return;
      }


      const res = await axios.get(
        `http://localhost:8000/api/favorites/${user._id || user.id}`
      );


      console.log("FAVORITES RESPONSE:", res.data);



      const favoriteSongs = res.data.map((item)=>{

        // case 1: populated favorite
        if(item.song && typeof item.song === "object"){
          return item.song;
        }


        // case 2: direct song returned
        if(item.title){
          return item;
        }


        return null;

      }).filter(Boolean);



      setSongs(favoriteSongs);


    } catch(err){

      console.log(
        "FAVORITES ERROR:",
        err
      );

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(() => {

  const loadFavorites = async () => {

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setTimeout(loadFavorites, 200);
      return;
    }

    fetchFavorites();

  };


  loadFavorites();


}, []);



  if(loading){

    return(
      <h1 className="text-white text-2xl">
        Loading favorites...
      </h1>
    );

  }



  return (

    <div className="w-full">


      <h1 className="
        text-white
        text-4xl
        font-bold
        mb-8
      ">
        ❤️ Your Favorites
      </h1>



      {
        songs.length === 0 ? (

          <div className="
            py-24
            rounded-3xl
            bg-white/5
            border
            border-white/10
            text-center
          ">

            <p className="
              text-5xl
              mb-5
            ">
              ❤️
            </p>


            <h2 className="
              text-white
              text-2xl
              font-bold
            ">
              No Favorite Songs Yet
            </h2>


            <p className="
              text-gray-400
              mt-3
            ">
              Add songs using the favorite button.
            </p>


          </div>


        ) : (


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-6
          ">


            {
              songs.map((song,i)=>(

                <SongCard

                  key={song._id}

                  song={song}

                  data={songs}

                  i={i}

                  activeSong={activeSong}

                  isPlaying={isPlaying}

                />

              ))
            }


          </div>


        )
      }



    </div>

  );

};


export default Favorites;