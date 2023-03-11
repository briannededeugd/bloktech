//////////////////////////////////////////
////////////////////// MONGO DB CONNECTIE
//////////////////////////////////////////

/* eslint-disable no-undef */
console.log("Hello");

// NODIG OM .ENV BESTAND IN TE LADEN
require("dotenv").config();

/////////////////////////////////////
////// BASIC BENODIGDE CONSTS EN APPS
/////////////////////////////////////

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

// Met express.static zeg ik dat mijn server alle statische files mag gebruiken in de directory
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGODB_URI;
// MONGO DB CONNECTIE// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
async function main() {
	try {
		await mongoose.connect(uri, {
			dbName: "rhythm_roulette",
		});
		console.log("connected");
	} catch (err) {
		console.log(err);
	}
}
main().catch((err) => console.log(err));

// const fs = require("fs");
// const jsonData = fs.readFileSync("static/data/songs.json", "utf8");
// let myData = JSON.parse(jsonData);

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

//////////////////////////////////////////////////////////
// FORMULIER VERSTUREN EN REDIRECTEN NAAR VOLGENDE PAGINA
//////////////////////////////////////////////////////////

let selectedFeatures;
let selectedMoods;
let selectedLanguage;

app.post("/userPost", handleUserPost);

function handleUserPost(req, res) {
	const formData = req.body;
	const nextPage = formData["nextPage"];
	res.redirect(nextPage);

	if (selectedFeatures === undefined) {
		selectedFeatures = req.body.feature;
	}

	if (selectedMoods === undefined) {
		selectedMoods = req.body.moods;
	}

	if (selectedLanguage === undefined) {
		selectedLanguage = req.body.language;
	}
}

////////////////////////
// DE MATCHING -> BASIS
////////////////////////

// define a schema for your song data
//define a schema for your songdata
const songSchema = new mongoose.Schema({
	title: String,
	artist: String,
	moods: Array,
	language: String,
	feature: Array,
	audiofile: String,
	cover: String,
});
// model voor songdata
const Song = mongoose.model("Song", songSchema);

// parse info die je krijgt van de body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////
// laadt de resultatenpagina met de resultaten van de gemaakte keuzes
////////////////////////////////////////////////////////////////////

app.post("/resultaat", async (req, res) => {
	if (!Array.isArray(selectedFeatures)) {
		selectedFeatures = selectedFeatures.split(",");
	}

	if (!Array.isArray(selectedMoods)) {
		selectedMoods = selectedFeatures.split(",");
	}

	const songs = await Song.find({
		moods: { $in: selectedMoods },
		features: { $in: selectedFeatures },
	}).exec();

	// console.log("selectedMoods:", selectedMoods);
	// console.log("selectedFeatures:", selectedFeatures);

	// const songs = await Song.find({
	// 	moods: { $in: ["optimistisch", "energiek"] },
	// 	feature: { $in: ["vibe", "beat"] },
	// }).exec();

	console.log("Matching songs:", songs);
	console.log("Matching Features:", selectedFeatures);
	console.log("Matching Moods:", selectedMoods);

	// console.log(song);

	res.render("resultaat", {
		title: Song.title,
		artist: Song.artist,
	});

	console.log("@@-- req.body", req.body);
	console.log("@@-- feature", selectedFeatures);
	console.log("@@-- moods", selectedMoods);
	console.log("@@-- language", selectedLanguage);
});

////////////////////////////////////////
////////////////// 404 + LOCALHOST PORT
////////////////////////////////////////

app.get("*", function (req, res) {
	res.status(404).send("Page not found");
});

app.listen(PORT, () => console.log("Running on port: 8080"));
