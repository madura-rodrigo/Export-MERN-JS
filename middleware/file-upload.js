const multer = require("multer");
const config = require("config");

const uploadURI = config.get("uploadURI");

module.exports = upload = function (target) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadURI + target);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  return multer({ storage: storage });
};
