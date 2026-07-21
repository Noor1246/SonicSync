const Favorite = require("../models/Favorite");


// Toggle favorite
const toggleFavorite = async (req, res) => {

  try {

    const { user, song } = req.body;


    if (!user || !song) {
      return res.status(400).json({
        message: "User and song are required"
      });
    }


    const existing = await Favorite.findOne({
      user,
      song
    });



    // Remove favorite
    if (existing) {

      await Favorite.findByIdAndDelete(existing._id);


      return res.json({

        message: "Removed from favorites",

        favorite: false

      });

    }



    // Add favorite
    const favorite = await Favorite.create({

      user,
      song

    });



    res.status(201).json({

      message: "Added to favorites",

      favorite: true,

      data: favorite

    });



  } catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};





// Get all favorites of user
const getFavorites = async (req, res) => {

  try {


    const favorites = await Favorite.find({

      user: req.params.userId

    })
    .populate("song");



    res.json(favorites);



  } catch (err) {


    res.status(500).json({

      message: err.message

    });


  }

};






// Check favorite status
const checkFavorite = async (req, res) => {

  try {


    const favorite = await Favorite.findOne({

      user: req.params.userId,

      song: req.params.songId

    });



    res.json({

      favorite: Boolean(favorite)

    });



  } catch (err) {


    res.status(500).json({

      message: err.message

    });


  }

};





module.exports = {

  toggleFavorite,

  getFavorites,

  checkFavorite

};