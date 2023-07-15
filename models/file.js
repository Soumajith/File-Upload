const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const FileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
});

FileSchema.post("save", async (doc) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: `Cloudidas`,
      to: doc.email,
      subject: "New File Upload in Cloudinary",
      html: `<h1>File Upload</h1><p>Click here to view <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
    });
  } catch (err) {
    console.log("Error", err);
  }
});

module.exports = mongoose.model("File", FileSchema);
