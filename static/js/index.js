// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 8080;

// // Met express.static zeg ik dat mijn server alle statische files mag gebruiken in de directory.
// // Daarna zeg ik dat hij alle bestanden in de css directory mag gebruiken.
// app.use(express.static("static"));


// // req staat voor 'request', dus wat de HTTP request is, en res staat voor 'response' wat een express app terugstuurt 
// app.get('/', onHome)

// function onHome(req, res) {
//     // res.send('Hallo');
//     res.sendFile(path.join(__dirname, 'view/index.html'));
// }

// app.get('/voelen', onVoelen)

// function onVoelen(req, res) {
//     // res.send('Hallo');
//     res.sendFile(path.join(__dirname, 'view/voelen.html'));
// }
  
// app.get('/taal', onTaal)

// function onTaal(req, res) {
//     res.sendFile(path.join(__dirname, 'view/taal.html'));
// };

// app.get('/muziekelement', onMuziekelement)

// function onMuziekelement(req, res) {
//     res.sendFile(path.join(__dirname, 'view/muziekelement.html'));
// };

// app.get('*', function(req, res) {
//   res.status(404).send('Page not found');
// });

// app.listen(PORT, () => console.log('Running on port: 8080'));