
const csv = require('csvtojson')

var express = require('express');
var sqlClient = require('sqlite3');
const guid = require('uuid');

var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
app.options('*', cors());

var Klausimynas = new sqlClient.Database('duomenubaze');
Klausimynas.run("CREATE TABLE IF NOT EXISTS administratoriai (id TEXT, pastas TEXT, slaptazodis TEXT)");
Klausimynas.run("CREATE TABLE IF NOT EXISTS vartotojai (id TEXT, imonespavadinimas TEXT, pastas TEXT, slaptazodis TEXT)");
Klausimynas.run("CREATE TABLE IF NOT EXISTS klausimai (id TEXT, klausimas TEXT, kategorija TEXT, tipas TEXT)");
Klausimynas.run("CREATE TABLE IF NOT EXISTS atsakymai (id TEXT, klausimoid TEXT, vartotojoid TEXT, atsakymas TEXT, komentarai TEXT)");

app.post('/klausimai', function (req, res) {
  var klausimas = req.body.klausimas;
  var kategorija = req.body.kategorija;
  var tipas = req.body.tipas;

  Klausimynas.run(`INSERT INTO klausimai VALUES("${guid.v4()}", "${klausimas}", "${kategorija}", "${tipas}")`);

  res.send("yes");
});

app.get('/klausimai', function (req, res) {
  Klausimynas.all("SELECT * from klausimai", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
})

app.get('/dataimport', function (req, res) {
  const converter = csv({ delimiter: ";" }).fromFile('./Data.csv').then((json) => { json.forEach(item => { 
     Klausimynas.run(`INSERT INTO klausimai VALUES("${guid.v4()}", "${item['klausimas']}", "${item['kategorija']}", "random")`); 
   // Klausimynas.run(`INSERT INTO klausimai VALUES("${guid.v4()}", "tu", "${item['kategorija']}", "${item['subkategorija']}", "random")`); 
  }); })
  res.send("Testas")
})




















var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})


