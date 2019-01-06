//importing modules

let request = require('request');
let path = require('path');
let express = require('express');
let app = express();
let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/snake-game'); //connecting to the database

let htmlPath = path.join(__dirname); // setting path for project

app.use(express.static(htmlPath)); // using middilewere 

let playerSchema = new mongoose.Schema({

  name: String, // database schema
  score: Number
});

let Player = mongoose.model('Player', playerSchema); //modeling database

let data, db, scores, topfive, str;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');

});

app.use('/gameover/:name/:score', (req, res) => {
  req.params.score = +req.params.score;
  let playerRecord = new Player(req.params);
  data = req.params;
  playerRecord.save()
    .then(item => {
      console.log('score saved to database' + req.params);
    })
    .catch(err => {
      console.log(err);
    });

  res.redirect('http://localhost:8000/gamestats');
});

app.get('/gamestats', function(req, res) {
  Player.find(function(err, db) {
    scores = db.map((a) => a.score);
    topfive = db.sort((a, b) => b.score - a.score).slice(0, 5);
    str = topfive.map((obj) => obj.name + ' : ' + obj.score).join('<br/>');
    res.send(`<body style = "background : Teal;">
		<center>
		<h1 style = "font-size: 100px ">Game Over</h1>
		<h1> Your Score: ${data.score}</h1>
		<h1> Topscore: ${Math.max(...scores)}</h1>
		<h1> Your Rank : ${scores.sort((a,b)=> b-a).indexOf(data.score)+1}</h1>
		<button onclick="window.location = 'http://localhost:8000/'">Play Again</button>
		<br/>
		<h1> Top scorers </h1>
		<h3> ${str}</h3>
		</center>
		</body>
		`);

  });
});

app.listen(8000);
require('openurl').open('http://localhost:8000/')