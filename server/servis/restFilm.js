const FilmDAO = require("./filmDAO.js");

exports.getFilmovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let fdao = new FilmDAO();
  fdao.dajSve().then((filmovi) => {
    console.log(filmovi);
    odgovor.send(JSON.stringify(filmovi));
  });
};

exports.postfilmovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let podaci = zahtjev.body;
  let fdao = new FilmDAO();
  fdao.dodaj(podaci).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.deletefilmovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let fdao = new FilmDAO();
  let id = zahtjev.params.id;
  console.log("Id u deleteFilmovije"+id+ "zahtjev params je"+zahtjev.params.id);
  /*fdao.obrisi(id, zahtjev.body).then((film) => {
    console.log(film);
    odgovor.send(JSON.stringify(film));
  });*/

  fdao.obrisi(id).then((film) => {
    console.log(film);
    odgovor.send(JSON.stringify(film));
  });
};


exports.getFilm = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let fdao = new FilmDAO();
  let idFilm = zahtjev.params.id;
  fdao.daj(idFilm).then((film) => {
    console.log(film);
    odgovor.send(JSON.stringify(film));
  });
};


exports.postFilm = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije dopustena (405)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.putApiFilmovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.deleteApiFilmovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.deleteFilm = function (zahtjev, odgovor) {
  odgovor.type("application/json");

  let fdao = new FilmDAO();
  let id = zahtjev.params.id;
  fdao.obrisi(id).then((zanr) => {
    console.log(zanr);
    odgovor.send(JSON.stringify(zanr));
  });
};

exports.putFilm = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let korime = zahtjev.params.korime;
  let podaci = zahtjev.body;
  let fdao = new FilmDAO();
  fdao.azuriraj(korime, podaci).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};
