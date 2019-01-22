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

app.post('/game', (req,res) => {
  const {p1Ships} = req.body;
  const {p2Ships} = req.body;
  const shipVars = {p1Ships, p2Ships};
  res.render("game", shipVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});