const File = require("../models/file");

exports.localFileUpload = async (request, response) => {
  try {
    //fetch
    const file = request.files.file;
    console.log("File -> ", file);

    //create path
    const path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("Path -> ", path);

    //move
    file.mv(path, (err) => {
      console.log(err);
    });

    response.status(200).json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
