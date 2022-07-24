const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Umit",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Umit",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "help me",
    name: "umit",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.lat || !req.query.lon) {
    return res.send("coordinates mandatory");
  }
  const {lat, lon} = req.query;
  geocode(lat, lon, (error, data) => {
    if(error){
      return res.send({error})
    }
    res.send({
      forecast: data,
    });
  })
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "Help not found",
    name: "umit",
  });
});

app.get("*", (req, res) => {
  res.render("404-page", {
    title: "404 Page",
    name: "umit",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
