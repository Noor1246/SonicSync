const Favorite = require("../models/Favorite");
const RecentlyPlayed = require("../models/RecentlyPlayed");
const Song = require("../models/song");


const getRecommendations = async (req, res) => {

  try {

    const userId = req.params.userId;


    const favorites = await Favorite.find({
      user: userId
    })
      .populate("song");


    const recent = await RecentlyPlayed.find({
      user: userId
    })
      .populate("song");



    const artists = new Set();
    const albums = new Set();



    favorites.forEach((item)=>{

      if(item.song){

        artists.add(item.song.artist);

        if(item.song.album)
          albums.add(item.song.album);

      }

    });



    recent.forEach((item)=>{

      if(item.song){

        artists.add(item.song.artist);

        if(item.song.album)
          albums.add(item.song.album);

      }

    });



    let recommendations = [];



    // Personalized recommendations
    if(
      artists.size ||
      albums.size
    ){

      recommendations =
        await Song.find({

          $or:[

            {
              artist:{
                $in:[...artists]
              }
            },

            {
              album:{
                $in:[...albums]
              }
            }

          ]

        });

    }



    // If no history, show random songs
    if(!recommendations.length){

      recommendations =
        await Song.aggregate([
          {
            $sample:{
              size:8
            }
          }
        ]);

    }



    // Shuffle personalized results also
    else {

      recommendations =
        recommendations
        .sort(
          ()=>Math.random()-0.5
        )
        .slice(0,8);

    }



    res.json(recommendations);



  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};


module.exports={
  getRecommendations
};