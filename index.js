const express = require("express");
const app = express();
require("dotenv").config();
const fileUpload = require("./routes/FileUpload");
const dbconnect = require("./config/database");
const express_fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(
  express_fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/upload", fileUpload);

dbconnect();

//Cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
