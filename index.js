const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { urlencoded } = require("express");

//Seting path to .env file
dotenv.config({ path: "./Config/config.env" });

//Encoding url for parsing
app.use(urlencoded({ extended: true }));

//DB connecting:
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Connected on ${process.env.MONGO_URI}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

//Set listening port
const PORT = process.env.PORT || 3000;

//set render engine
app.set("view engine", "ejs");

//set views folder
app.set("views", path.join(__dirname, "views"));
//Listening port

app.listen(PORT, () => {
  console.log(`App listening on ${PORT} `);
});
