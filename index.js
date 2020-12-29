const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { urlencoded } = require("express");

//Initialize express as app const
const app = express();

//require ejs mate (tool for using layouts and templates boiler plates)
const ejsMate = require("ejs-mate");

//app using ejs-mate to use templates
app.engine("ejs", ejsMate);

//requiring routes
const productRoute = require("./routes/product_routes");
const storeRoute = require("./routes/store_routes");
const mainRoute = require("./routes/main");

//Using Routes

//Main:
app.use("/", mainRoute);

//Seting up .env path, const
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });

//Encoding url for parsing
app.use(urlencoded({ extended: true }));

//DB Connection
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

//Set PORT const
const PORT = process.env.PORT || 3000;

//set render engine
app.set("view engine", "ejs");

//set views folder
app.set("views", path.join(__dirname, "views"));

//Listening port
app.listen(PORT, () => {
  console.log(`App listening on ${PORT} `);
});
