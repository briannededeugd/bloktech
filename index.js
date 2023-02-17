const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

// req staat voor 'request', dus wat de HTTP request is, en res staat voor 'response' wat een express app terugstuurt 
app.get('/', onHome)

function onHome(req, res) {
    res.send('Hallo');
}

app.get('voelen', onVoelen);

function onVoelen(req, res){
    res.send('voelen');
}

app.listen(PORT, () => console.log('Running on port: 8080'))