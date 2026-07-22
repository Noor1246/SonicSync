const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


const storage = new CloudinaryStorage({

  cloudinary,

  params: async (req, file) => {

    if (file.fieldname === "image") {

      return {
        folder: "sonicsync/images",
        resource_type: "image",
      };

    }


    if (file.fieldname === "audio") {

      return {
        folder: "sonicsync/audio",
        resource_type: "video",
      };

    }


    return {
      folder:"sonicsync/others"
    };

  },

});


const upload = multer({
  storage,
});


module.exports = upload;