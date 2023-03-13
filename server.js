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
const { ObjectId } = require("mongodb");
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

// Formulier om eigen lied toe te voegen
app.get("/newsong", onNewSong);

function onNewSong(req, res) {
	res.render("newsong");
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
	_id: ObjectId,
	title: String,
	artist: String,
	moods: Array,
	language: Array,
	feature: Array,
	cover: String,
	audiofile: String,
});
// model voor songdata
const Song = mongoose.model("Song", songSchema);

// parse info die je krijgt van de body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////
// FILTER ALLE LIEDJES OP BASIS VAN FEATURES EN MOODS
////////////////////////////////////////////////////////////////////

app.post("/resultaat", async (req, res) => {
	if (selectedLanguage === undefined) {
		selectedLanguage = req.body.language;
	}
	const songs = await Song.find({});

	// Ik maak een variabele filterSongs, waarin er een functie wordt uitgevoerd. Eerst pak
	// (retrieve) ik 'songs', die ik hierboven heb gedefinieerd als de Song array, oftewel alle liedjes in mijn database.
	// Dan pak ik van die array de features, en zeg ik 'filter alle liedjes in mijn database collectie die de 'selectedFeatures'
	// als waarde van het feature veld hebben. selectedFeatures heb ik eerder gedefinieerd als req.body.features.
	const filterSongs = (songs) => {
		const filterOnLanguages = songs.filter((song) =>
			Array.isArray(song.language)
				? song.language.some((language) => selectedLanguage.includes(language))
				: selectedLanguage.includes(song.language)
		);

		const filterOnMoods = filterOnLanguages.filter((song) =>
			Array.isArray(song.moods)
				? song.moods.some((mood) => selectedMoods.includes(mood))
				: selectedMoods.includes(song.moods)
		);

		const songsFromFilter = filterOnMoods.filter((song) =>
			Array.isArray(song.feature)
				? song.feature.some((feature) => selectedFeatures.includes(feature))
				: selectedFeatures.includes(song.feature)
		);

		return songsFromFilter;
	};

	const filteredSongs = filterSongs(songs); // Hier maak ik een variabele aan voor de liedjes uit mijn database die uit mijn filters komen.
	console.log(filteredSongs); // En die gefilterde liedjes log ik vervolgens in de terminal.

	console.log("@@-- req.body", req.body);
	console.log("@@-- feature", selectedFeatures);
	console.log("@@-- moods", selectedMoods);
	console.log("@@-- language", selectedLanguage);

	/////////////////////////////////////////////////////////
	// KIES BESTE MATCH UIT DE GEFILTERDE LIJST VAN NUMMERS
	/////////////////////////////////////////////////////////

	const findBestMatch = function (
		selectedLanguage,
		selectedMoods,
		selectedFeatures,
		songsFromFilter
	) {
		// Define a helper function to calculate the score for each song
		const calculateScore = (song) => {
			let score = 0;
			if (
				song.language &&
				song.language.some((language) => selectedLanguage.includes(language))
			) {
				score += 3;
			}
			if (
				song.moods &&
				song.moods.some((mood) => selectedMoods.includes(mood))
			) {
				score += 2;
			}

			if (
				song.feature &&
				song.feature.some((feature) => selectedFeatures.includes(feature))
			) {
				score += 1;
			}
			return score;
		};

		// Calculate the score for each song and store it in a new array
		const scores = songsFromFilter.map((song) => {
			return {
				song: song,
				score: calculateScore(song),
			};
		});

		// Sort the songs by their score, with the highest-scoring song first
		scores.sort((a, b) => b.score - a.score);

		// Return the highest-scoring song (or null if no songs were found)
		return scores.length > 0 ? scores[0].song : null;
	};

	const bestMatch = findBestMatch(
		selectedLanguage,
		selectedMoods,
		selectedFeatures,
		filteredSongs
	);
	console.log("DE BESTE MATCH IS:", bestMatch);

	////////////////////////////////////////////
	// RENDER HET RESULTAAT OP RESULTATENPAGINA
	////////////////////////////////////////////

	res.render("resultaat", {
		title: bestMatch.title,
		artist: bestMatch.artist,
		cover: bestMatch.cover,
		audiofile: bestMatch.audiofile,
	});
});

////////////////////////////////////////
////////////////// 404 + LOCALHOST PORT
////////////////////////////////////////

app.get("*", function (req, res) {
	res.status(404).send("Page not found");
});

app.listen(PORT, () => console.log("Running on port: 8080"));
