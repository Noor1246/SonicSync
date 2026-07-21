const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

  destination: function(req, file, cb){

    if(file.fieldname === "image"){
      cb(null, "uploads/images");
    }

    else if(file.fieldname === "audio"){
      cb(null, "uploads/audio");
    }

    else if(file.fieldname === "profileImage"){
      cb(null, "uploads/profile");
    }

  },


  filename: function(req, file, cb){

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  }

});


const upload = multer({
  storage,
});


module.exports = upload;