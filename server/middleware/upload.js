const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


const imageStorage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:"sonicsync/images",
    resource_type:"image",
  },
});


const audioStorage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:"sonicsync/audio",
    resource_type:"video",
  },
});


const upload = multer({

  storage:(req,file,cb)=>{

    if(file.fieldname==="image"){
      imageStorage._handleFile(req,file,cb);
    }

    else if(file.fieldname==="audio"){
      audioStorage._handleFile(req,file,cb);
    }

  }

});


module.exports = upload;