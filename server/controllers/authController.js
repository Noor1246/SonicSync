const User = require("../models/User");
const Favorite = require("../models/Favorite");
const RecentlyPlayed = require("../models/RecentlyPlayed");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// GET PROFILE WITH STATS
const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.params.id)
      .select("-password");


    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }


    const favoriteCount = await Favorite.countDocuments({
      user: req.params.id
    });


    const songsPlayed = await RecentlyPlayed.countDocuments({
      user: req.params.id
    });


    res.json({

      user,

      stats: {
        favorites: favoriteCount,
        songsPlayed
      }

    });


  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};




// REGISTER
const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    const userExists = await User.findOne({
      email
    });


    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });

    }


    const hashedPassword =
      await bcrypt.hash(password, 10);



    const user = await User.create({

      name,
      email,
      password: hashedPassword

    });



    res.status(201).json({

      message: "User Registered Successfully",

      user

    });



  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};





// LOGIN
const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;



    const user = await User.findOne({
      email
    });



    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }



    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );



    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      });

    }



    const token = jwt.sign(

  {
    id: user._id,
    role: user.role
  },

  process.env.JWT_SECRET,

  {
    expiresIn: "7d"
  }

);



    res.status(200).json({

      message: "Login Successful",

      token,


      user: {

  id: user._id,

  name: user.name,

  email: user.email,

  role: user.role

}

    });



  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};





module.exports = {
  register,
  login,
  getProfile
};