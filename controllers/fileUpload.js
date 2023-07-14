const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

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

const checkFileType = (fileType, selectedTypes) => {
  return selectedTypes.includes(fileType);
};

const cloudinaryUpload = async (file, folder, quality) => {
  const option = { folder };
  if (quality) {
    option.quality = quality;
  }
  option.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, option);
};

exports.imageUpload = async (request, response) => {
  try {
    // fetch
    const { name, tags, email } = request.body;
    const file = request.files.imageFile;
    const selectedTypes = ["png", "jpeg", "jpg"];
    const fileType = file.name.split(".")[1];

    // validation
    if (!checkFileType(fileType, selectedTypes)) {
      return response.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    // cloudinary upload
    const res = await cloudinaryUpload(file, "Soumajith");
    console.log(res);

    // add in the database
    const flleData = await File.create({
      name,
      email,
      imageUrl: res.secure_url,
      tags,
    });
    return response.status(200).json({
      success: true,
      message: "File uploaded successfully",
      imageUrl: res.secure_url,
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.videoUpload = async (request, response) => {
  try {
    const { name, email, tags } = request.body;
    const file = request.files.file;
    const fileType = file.split(".")[1];
    const supportedType = ["mp4", "mov", "gif"];

    //validation
    if (!checkFileType(fileType, supportedType))
      return response.status(400).json({
        success: false,
        message: "File not supported",
      });

    // upload to cloudinary
    const res = await cloudinaryUpload(file, "soumajith");
    console.log(res);

    // add it to the database
    const fileData = await File.create({
      name,
      email,
      imageUrl: res.secure_url,
      tags,
    });

    response.status(200).json({
      success: true,
      message: "Video upload successfully",
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.imageReducedUpload = async (request, response) => {
  try {
    // fetch
    const { name, tags, email } = request.body;
    const file = request.files.imageFile;
    const selectedTypes = ["png", "jpeg", "jpg"];
    const fileType = file.name.split(".")[1];

    // validation
    if (!checkFileType(fileType, selectedTypes)) {
      return response.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    // cloudinary upload
    const res = await cloudinaryUpload(file, "Soumajith", 10);
    console.log(res);

    // add in the database
    const flleData = await File.create({
      name,
      email,
      imageUrl: res.secure_url,
      tags,
    });
    return response.status(200).json({
      success: true,
      message: "File uploaded successfully",
      imageUrl: res.secure_url,
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
