const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.get('/', (req,res) => {
  res.render("setup");
});

app.get('/game', (req,res) => {
  res.render("game");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});