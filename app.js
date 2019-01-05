let request = require('request');
let path = require('path');
let express = require('express');
let app = express();


let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/snake-game');

let htmlPath = path.join(__dirname, 'html');
app.use(express.static(htmlPath));

let playerSchema = new mongoose.Schema({

    name  : String,
    score : Number
});

let Player = mongoose.model("Player", playerSchema);
let data;

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.use("/gameover/:name/:score", (req, res) => {
  req.params.score = +req.params.score;
  let playerRecord = new Player(req.params);
  data = req.params;
  playerRecord.save()
    .then(item => {
      console.log("score saved to database"+ req.params);
    })
    .catch(err => {
      console.log(err);
    });

    res.redirect('http://localhost:8000/gamestats');
});
app.get('/gamestats',function(req,res){
	Player.find( function(err,players){
	players = players.map((a) => a.score);
	console.log(players);	
	res.send(`<center>
		<h1>Game Over</h1>
		<h1> Your Score: ${data.score}</h1>
		<h1> Topscore: ${Math.max(...players)}.</h1>
		<h1> Your Rank : ${players.sort((a,b)=> b-a).indexOf(data.score)+1}</h1>
		<button onclick="window.location = 'http://localhost:8000/'">Play Again</button></center>`);
	});
});



app.listen(8000);