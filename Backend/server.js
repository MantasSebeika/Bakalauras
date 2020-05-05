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


app.get('/excelgenerate', function (req, res) {
  const Excel = require('exceljs');

  var options = {
    filename: './streamed-workbook.xlsx',
    useStyles: true,
    useSharedStrings: true
  };
  var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
  var sheet = workbook.addWorksheet('IT Klausimynas');
  sheet.getCell('A1').value = "Įmonė:";
  // sheet.getCell('B1').value = imonespavadinimas;
  sheet.getCell('C1').value = "Vartotojas:";
  sheet.getCell('A2').value = "Kategorija";
  sheet.getCell('B2').value = "Klausimas";
  sheet.getCell('C2').value = "Atsakymas";
  sheet.getCell('D2').value = "Komentaras";
  sheet.getCell('E2').value = "Identifikuota rizika";
  sheet.getCell('F2').value = "Rekomendacija";
  sheet.getCell('G2').value = "Svarba";

  // Klausimynas.all(`Select * from klausimai`, [], (err, rows) => {
  //   if (err) {
  //     throw err;
  //   }

  Klausimynas.all(`Select * from klausimai as kl left join atsakymai as ats on kl.id=ats.klausimoid and ats.imonesid='${req.body['imonesid']}'`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    var index = 3;
    
    rows.forEach(row => {
      sheet.getCell('A' + index).value = row["kategorija"];
      sheet.getCell('B' + index).value = row["klausimas"];
      sheet.getCell('C' + index).value = row["atsakymas"];
      sheet.getCell('D' + index).value = row["komentaras"];
      index = index + 1;
    })

    sheet.commit();
    workbook.commit();
    res.send(true);
  });




}
)

var Klausimynas = new sqlClient.Database('duomenubaze6');
Klausimynas.run("CREATE TABLE IF NOT EXISTS administratoriai (id TEXT, pastas TEXT, slaptazodis TEXT)");
Klausimynas.run("CREATE TABLE IF NOT EXISTS vartotojai (id TEXT, imonespavadinimas TEXT, pastas TEXT, slaptazodis TEXT)");
Klausimynas.run("CREATE TABLE IF NOT EXISTS klausimai (id TEXT, klausimas TEXT, kategorija TEXT, tipas TEXT)");
Klausimynas.run("CREATE TABLE IF NOT EXISTS atsakymai (klausimoid TEXT, imonesid TEXT, atsakymas TEXT, komentarai TEXT, Constraint Id_Atsakymai UNIQUE (klausimoid, imonesid))");
Klausimynas.run("CREATE TABLE IF NOT EXISTS imones (id TEXT, imonespavadinimas TEXT)");

app.post('/klausimai/update', function (req, res) {

  Klausimynas.run(`UPDATE klausimai 
  SET kategorija="${req.body['kategorija']}", klausimas="${req.body['klausimas']}"
  WHERE id="${req.body['id']}"`, [], (err) => {

    if (err) {
      throw err;
    }
    res.send(true);
  }

  )
}
)


app.post('/klausimai/new', function (req, res) {

  Klausimynas.run(`INSERT INTO klausimai (id, kategorija, klausimas, tipas) VALUES ("${guid.v4()}", "${req.body['kategorija']}" ,"${req.body['klausimas']}", "random")`, [], (err) => {
    if (err) {
      throw err;
    }

  });
  res.send(true);
})


app.post('/klausimai/delete', function (req, res) {

  Klausimynas.run(`DELETE from klausimai where id='${req.body['id']}'`, [], (err) => {
    if (err) {
      throw err;
    }

  });
  res.send(true);
})

app.post('/vartotojai/new', function (req, res) {

  Klausimynas.run(`INSERT INTO vartotojai (id, imonespavadinimas, pastas, slaptazodis) VALUES ("${guid.v4()}", "${req.body['imonespavadinimas']}" ,"${req.body['pastas']}", "${req.body['slaptazodis']}")`, [], (err) => {

    if (err) {
      throw err;
    }
    res.send(true);
  }

  )
}
)


app.post('/vartotojai/update', function (req, res) {

  Klausimynas.run(`UPDATE vartotojai 
  SET pastas="${req.body['pastas']}", slaptazodis="${req.body['slaptazodis']}"
  WHERE id="${req.body['id']}"`, [], (err) => {

    if (err) {
      throw err;
    }
    res.send(true);
  }

  )
}
)



app.post('/vartotojai/delete', function (req, res) {

  Klausimynas.run(`DELETE from vartotojai where id='${req.body['id']}'`, [], (err) => {
    if (err) {
      throw err;
    }

  });
  res.send("Ištrinta");
})

app.get('/vartotojai', function (req, res) {

  Klausimynas.all(`Select * from vartotojai`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
})

app.post('/klausimaiadmin', function (res) {
  Klausimynas.all(`Select * from klausimai`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
})

app.post('/klausimai', function (req, res) {
  Klausimynas.all(`Select * from klausimai as kl left join atsakymai as ats on kl.id=ats.klausimoid and ats.imonesid='${req.body['imonesid']}'`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
})

app.get('/dataimport', function (req, res) {
  const converter = csv({ delimiter: ";" }).fromFile('./Data.csv').then((json) => {
    json.forEach(item => {
      Klausimynas.run(`INSERT INTO klausimai VALUES("${guid.v4()}", "${item['klausimas']}", "${item['kategorija']}", "random")`);
    });
  })
  res.send("Klausimai import")
})

app.get('/vartotojaiimport', function (req, res) {
  const converter = csv({ delimiter: ";" }).fromFile('./vartotojai.csv').then((json) => {
    json.forEach(item => {
      Klausimynas.run(`INSERT INTO vartotojai VALUES("${guid.v4()}", "${item['imonespavadinimas']}", "${item['pastas']}", "${item['slaptazodis']}")`);
    });
  })
  res.send("Vartotojai import")
})

app.get('/administratoriaiimport', function (req, res) {
  const converter = csv({ delimiter: ";" }).fromFile('./administratoriai.csv').then((json) => {
    json.forEach(item => {
      Klausimynas.run(`INSERT INTO administratoriai VALUES("${guid.v4()}", "${item['pastas']}", "${item['slaptazodis']}")`);
    });
  })
  res.send("Administratoriai import")
})

app.post('/prisijungti', function (req, res) {
  Klausimynas.all(`SELECT * from vartotojai where pastas="${req.body['pastas']}" and slaptazodis="${req.body['slaptazodis']}"`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    if (rows.length == 0) {
      res.send(false);
    } else
      res.send(true);
  }
  )

}
)

app.post('/prisijungtiadmin', function (req, res) {
  Klausimynas.all(`SELECT * from administratoriai where pastas="${req.body['pastas']}" and slaptazodis="${req.body['slaptazodis']}"`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    if (rows.length == 0) {
      res.send(false);
    } else
      res.send(true);
  }
  )

}
)

app.post('/atsakymai', function (req, res) {
  Klausimynas.run(`INSERT INTO atsakymai (klausimoid, imonesid, atsakymas, komentarai) 
                  VALUES ("${req.body['klausimoid']}", "${req.body['imonesid']}", "${req.body['atsakymas']}", "${req.body['komentarai']}")`, [], (err) => {

    if (err) {
      Klausimynas.run(`UPDATE atsakymai 
                        SET atsakymas="${req.body['atsakymas']}", komentarai="${req.body['komentarai']}"
                        WHERE klausimoid="${req.body['klausimoid']}" and imonesid="${req.body['imonesid']}"`, [], (err) => {

        if (err) {


          throw err;
        }


      }
      )


    }

  }
  )
  res.send(true);
}
)


app.post('/dev', function (req, res) {
  Klausimynas.run(req.body["query"], [], (err) => {
    if (err) {
      throw err;
    } else
      res.send(true);

  }
  )






})



app.post('/dev2', function (req, res) {
  Klausimynas.all(req.body["query"], [], (err, rows) => {
    if (err) {
      throw err;
    } else
      res.send(rows);

  }
  )






})












var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})


