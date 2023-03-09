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

/////////////////////////////////////
//////////// DATA LEZEN UIT JSON FILE
/////////////////////////////////////

// // Read the contents of your JSON file
// const jsonData = fs.readFileSync("static/data/songs.json", "utf8");

// // Parse the JSON data into an array of objects
// const myData = JSON.parse(jsonData);

// // Get a random index from the array
// const randomIndex = Math.floor(Math.random() * myData.length);

// // Get the title and mood from the random object
// const title = myData[randomIndex].title;

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
	res.render("resultaat");
}

//////////////////////////////////////////////////////////
// FORMULIER VERSTUREN EN REDIRECTEN NAAR VOLGENDE PAGINA
//////////////////////////////////////////////////////////

app.post("/userPost", handleUserPost);

function handleUserPost(req, res) {
	const formData = req.body;
	const nextPage = formData["nextPage"];
	res.redirect(nextPage);

	req.session.feature = req.body.feature;
	req.session.moods = req.body.moods;
	req.session.language = req.body.language;
}

////////////////////////////////////////////////////////////////////
// DE MATCHING -> FORMS VERWERKEN, DATA OPHALEN OP BASIS VAN KEUZES
////////////////////////////////////////////////////////////////////

// define a schema for your song data
const songSchema = new mongoose.Schema({
	title: String,
	artist: String,
	moods: [String],
	language: String,
	feature: [String],
});

// model voor song data
const Song = mongoose.model("Song", songSchema);
// parse info die je krijgt van de body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// laadt de resultatenpagina met de resultaten van de gemaakte keuzes
app.post("/resultaat", (req, res) => {
	// Bepaal wat de gemaakte keuzes waren
	const feature = req.query.feature; // query verwijst naar de input van de gebruiker
	const moods = req.query.moods;
	const language = req.query.language;

	// query object bouwen op basis van user input. Met een query object kan de code
	// makkelijk dmv een soort 'template' de informatie pakken die nodig is om de goede feedback
	// te geven (in dit geval die van welk lied het beste past)
	const query = {};
	if (feature) {
		query.feature = feature;
	}
	if (moods) {
		query.moods = moods;
	}
	if (language) {
		query.language = language;
	}

	// Nadat de query is verstuurd naar de database in MongoDB met .find, volgt er een 'promise', waar
	// eigenlijk in staat dat uit alle liedjes die terugkomen (songs, want zo heet de collectie in mijn
	// database) de beste moet worden bepaald. Dat doe ik met een variabele genaamd bestSong. Om het
	// beste lied daadwerkelijk te vinden, maak ik een functie met alle parameters die ook in de documenten
	// belangrijk zijn en 'res', zodat ik in de functie iets terug kan sturen naar mijn gebruiker. In de
	// browser moet de titel van het lied en de artiest geladen worden, zoals bepaald in mijn EJS.
	Song.find(query)
		.then((songs) => {
			const bestSong = findBestSong(songs, feature, moods, language, res);
			res.render("resultaat", {
				title: bestSong.title,
				artist: bestSong.artist,
			});
		}) // Error handling
		.catch((err) => {
			console.error(err);
			res.status(500).send("Internal server error");
		});
});

// met songs.map pak ik alle liedjes in mijn database en itereer ik over de liedjes. '.map' maakt een gloed-
// nieuwe array met objects aan die bestaan uit: het lied, de score van het lied. Dit zijn OBJECTS, dus het ziet
// eruit als:
//  song { id: .., title: ..., artist: ...,
//  score: ... } De waarde van score: wordt bepaald door berekenMatch.
const matchScores = songs.map((song) => ({
	song,
	score: berekenMatch(song, feature, moods, language),
}));

/// berekenMatch berekent ... de match (wie had dat gedacht). Hij kijkt voor elk lied of iets overeenkomt.
function berekenMatch(song, feature, moods, language) {
	let score = 0;

	// de score van een lied neemt toe als een gekozen feature overeenkomt met de feature van een lied
	if (song.feature === feature) {
		score += 1;
	} // de score van een lied neemt toe als een gekozen mood overeenkomt met de mood van een lied
	if (song.moods === moods) {
		score += 1;
	} // de score van een lied neemt toe als een gekozen taal overeenkomt met de taal van een lied
	if (song.language === language) {
		score += 1;
	}

	// de score moeten we returnen, want anders kunnen we er later niks meer mee.
	return score;
}

// findBestSong bepaalt vervolgens nou echt wat het beste lied is.
function findBestSong(songs, feature, moods, language, res) {
	// vind het lied dat de beste match is met de keuzes van de gebruiker
	let bestMatch = matchScores[0];
	for (let i = 1; i < matchScores.length; i++) {
		if (matchScores[i].score > bestMatch.score) {
			bestMatch = matchScores[i];
		}
	}

	if (songs.length >= 1) {
		const bestSong = findBestSong(songs, feature, moods, language, res);
		return bestSong.song;
	} else {
		console.error("No songs found");
		res.status(500).send("No songs found");
		return;
	}
}

////////////////////////////////////////
////////////////// 404 + LOCALHOST PORT
////////////////////////////////////////

app.get("*", function (req, res) {
	res.status(404).send("Page not found");
});

app.listen(PORT, () => console.log("Running on port: 8080"));
