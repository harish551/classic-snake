let express = require('express')
let app = express();
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/snake-game');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let playerSchema = new mongoose.Schema({
  Name: String,
  score: Number
});
let Player = mongoose.model("Player", playerSchema);

app.get("/gameover/:name/:score", (req, res) => {
  let playerRecord = new Player(req.body);
  playerRecord.save()
    .then(item => {
      console.log("item saved to database");
    })
    .catch(err => {
      console.log(err);
    });
});
