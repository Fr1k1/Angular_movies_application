const TMDBklijent = require("./klijentTMDB.js");

class RestTMDB {
  constructor(api_kljuc) {
    this.tmdbKlijent = new TMDBklijent(api_kljuc);
    console.log(api_kljuc);

  }

  getZanr(zahtjev, odgovor) {
    console.log(this);
    this.tmdbKlijent
      .dohvatiZanrove()
      .then((zanrovi) => {
        odgovor.type("application/json");
        odgovor.send(zanrovi);
      })
      .catch((greska) => {
        odgovor.json(greska);
      });
  }

  getFilmovi(zahtjev, odgovor) {
    console.log(this);
    odgovor.type("application/json");
    let stranica = zahtjev.query.stranica;
    let rijeci = zahtjev.query.kljucnaRijec;


    this.tmdbKlijent
      .pretraziFilmove(rijeci, stranica)
      .then((filmovi) => {
        odgovor.send(filmovi);
      })
      .catch((greska) => {
        odgovor.json(greska);
      });
  }
}

exports.postTMDBzanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.postTMDBfilmovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.putTMDBfilmovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.deleteTMDBfilmovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};



module.exports = RestTMDB;
