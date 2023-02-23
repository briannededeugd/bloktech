console.log("Hello");

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Met express.static zeg ik dat mijn server alle statische files mag gebruiken in de directory
app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs')
app.use(express.static("static"));

const fs = require('fs');

// Read the contents of your JSON file
const jsonData = fs.readFileSync('static/data/songs.json', 'utf8');

// Parse the JSON data into an array of objects
const myData = JSON.parse(jsonData);

// Get a random index from the array
const randomIndex = Math.floor(Math.random() * myData.length);

// Get the title and mood from the random object
const title = myData[randomIndex].title;
const mood = myData[randomIndex].mood;






// req staat voor 'request', dus wat de HTTP request is, en res staat voor 'response' wat een express app terugstuurt 
app.get('/', onHome)

function onHome(req, res) {
    // res.send('Hallo');
    res.sendFile(path.join(__dirname, 'view/index.html'));
}


// Formulierpagina om gevoelens te kiezen
app.get('/voelen', onVoelen)

function onVoelen(req, res) {
    res.render('voelen');
}
  



// Formulier om muziekelement te kiezen
app.get('/muziekelement', onMuziekelement)

function onMuziekelement(req, res) {
    res.render('muziekelement');
};




// Formulier om taalvoorkeur te kiezen
app.get('/taal', onTaal)

function onTaal(req, res) {
    res.render('taal');
};


// Resultaatpagina
app.get('/resultaat', onResult)

function onResult(req, res) {
    res.render('resultaat', {title: myData[1].title, artist: myData[1].artist}),
    console.log({title});
};

app.get('*', function(req, res) {
  res.status(404).send('Page not found');
});










app.listen(PORT, () => console.log('Running on port: 8080'));