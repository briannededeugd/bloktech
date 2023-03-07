//////////////////////////////////////////
////////////////////// MONGO DB CONNECTIE
//////////////////////////////////////////

/* eslint-disable no-undef */
console.log("Hello");

// NODIG OM .ENV BESTAND IN TE LADEN
require("dotenv").config();

// MONGO DB CONNECTIE
const mongoose = require("mongoose");

// DB
const uri =
	"mongodb+srv://" +
	process.env.DB_USERNAME +
	":" +
	process.env.DB_PASS +
	"@" +
	process.env.DB_NAME +
	"." +
	process.env.DB_HOST +
	"/" +
	"?tls=true&retryWrites=true&w=majority";

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("db connected!");
});

// retryWrites=true&w=majority"

// console.log(uri);

// const client = new MongoClient(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// client.connect((err, db) => {
// 	if (err) {
// 		console.error("Error connecting to MongoDB:", err);
// 	} else {
// 		console.log("Connected to MongoDB!");
// 	}
// 	db.close();
// });

/////////////////////////////////////
////// BASIC BENODIGDE CONSTS EN APPS
/////////////////////////////////////

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

// Met express.static zeg ik dat mijn server alle statische files mag gebruiken in de directory
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use(express.static("static"));

const fs = require("fs");

/////////////////////////////////////
//////////// DATA LEZEN UIT JSON FILE
/////////////////////////////////////

// Read the contents of your JSON file
const jsonData = fs.readFileSync("static/data/songs.json", "utf8");

// Parse the JSON data into an array of objects
const myData = JSON.parse(jsonData);

// Get a random index from the array
const randomIndex = Math.floor(Math.random() * myData.length);

// Get the title and mood from the random object
const title = myData[randomIndex].title;

////////////////////////////////////////////
////////////// PAGINA'S INLADEN OP LOCALHOST
////////////////////////////////////////////

// req staat voor 'request', dus wat de HTTP request is, en res staat voor 'response' wat een express app terugstuurt
app.get("/", onHome);

function onHome(req, res) {
	// res.send('Hallo');
	res.sendFile(path.join(__dirname, "view/index.html"));
}

// Formulierpagina om gevoelens te kiezen
app.get("/voelen", onVoelen);

function onVoelen(req, res) {
	res.render("voelen");
}

// Formulier om muziekelement te kiezen
app.get("/muziekelement", onMuziekelement);

function onMuziekelement(req, res) {
	res.render("muziekelement");
}

// Formulier om taalvoorkeur te kiezen
app.get("/taal", onTaal);

function onTaal(req, res) {
	res.render("taal");
}

// Resultaatpagina
app.get("/resultaat", onResult);

function onResult(req, res) {
	res.render("resultaat", { title: myData[3].title, artist: myData[3].artist });
	console.log({ title });
}

//////////////////////////////////////////////////////////
// FORMULIER VERSTUREN EN REDIRECTEN NAAR VOLGENDE PAGINA
//////////////////////////////////////////////////////////

app.post("/userPost", handleUserPost);

function handleUserPost(req, res) {
	// sla data op in variabele
	// stuur data naar database
	// respond naar user met redirect: res.redirect('')
	res.redirect("");
}

////////////////////////////////////////
////////////////// 404 + LOCALHOST PORT
////////////////////////////////////////

app.get("*", function (req, res) {
	res.status(404).send("Page not found");
});

app.listen(PORT, () => console.log("Running on port: 8080"));
