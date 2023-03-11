//////////////////////////////////////////
////////////////////// MONGO DB CONNECTIE
//////////////////////////////////////////

/* eslint-disable no-undef */
console.log("Hello");

// NODIG OM .ENV BESTAND IN TE LADEN
require("dotenv").config();

// MONGO DB CONNECTIE
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/rhythm_roulette");

// DB
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect((err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,

		socketTimeoutMS: 50000,
		connectTimeoutMS: 50000,
	});
});

console.log(process.env.MONGODB_URI);

async function main() {
	const url = "mongodb://127.0.0.01:27017";

	const client = new MongoClient(url);

	try {
		await client.connect();
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("db connected!");
});

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

let feature;
let moods;
let language;

app.post("/userPost", handleUserPost);

function handleUserPost(req, res) {
	const formData = req.body;
	const nextPage = formData["nextPage"];
	res.redirect(nextPage);

	if (feature === undefined) {
		feature = req.body.feature;
	}

	if (moods === undefined) {
		moods = req.body.moods;
	}

	if (language === undefined) {
		language = req.body.language;
	}
}

////////////////////////
// DE MATCHING -> BASIS
////////////////////////

// define a schema for your song data
const songSchema = new mongoose.Schema({
	title: String,
	artist: String,
	moods: [String],
	language: String,
	feature: [String],
});

// model voor song data
const Song = mongoose.model("songs", songSchema);
// parse info die je krijgt van de body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

////////////////////////////////////////////////////////////////////
// laadt de resultatenpagina met de resultaten van de gemaakte keuzes
////////////////////////////////////////////////////////////////////

app.post("/resultaat", async (req, res) => {
	// const song = await Song.find(); //{
	// // feature: { $in: feature },
	// // language: { $in: language },
	// //moods: { $in: moods },}
	// // ();

	// console.log(song);

	res.render("resultaat", {
		title: Song.title,
		artist: Song.artist,
		feature: feature,
		moods: moods,
		language: language,
	});

	console.log("@@-- req.body", req.body);
	console.log("@@-- feature", feature);
	console.log("@@-- moods", moods);
	console.log("@@-- language", language);
});

// app.get("/database", async function testen(req, res) {
// 	const list = await Song.find({});
// 	console.log(list);
// 	res.end();
// });

////////////////////////////////////////
////////////////// 404 + LOCALHOST PORT
////////////////////////////////////////

app.get("*", function (req, res) {
	res.status(404).send("Page not found");
});

app.listen(PORT, () => console.log("Running on port: 8080"));
