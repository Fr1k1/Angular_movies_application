const ZanrDAO = require("./zanrDAO.js");

exports.getzanrovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let zdao = new ZanrDAO();
  zdao.dajSve().then((zanrovi) => {
    console.log(zanrovi);
    odgovor.send(JSON.stringify(zanrovi));
  });
};

exports.postzanrovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let podaci = zahtjev.body;
  let zdao = new ZanrDAO();
  zdao.dodaj(podaci).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};


exports.postZanrId=function(zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije dopustena (405)" };
  odgovor.send(JSON.stringify(poruka));
}

exports.putzanrovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.getZanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let zdao = new ZanrDAO();
  let idFilm = zahtjev.params.id;
  zdao.daj(idFilm).then((zanr) => {
    odgovor.send(JSON.stringify(zanr));
  });
};


exports.postZanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let zdao=new ZanrDAO();
  let id=zahtjev.params.id;

  let poruka=zdao.dodaj(zahtjev.body)
  
  odgovor.send(JSON.stringify(poruka));
};

exports.deleteZanr = function (zahtjev, odgovor) { 
  odgovor.type("application/json");
  let zdao=new ZanrDAO();
  let id=zahtjev.params.id;
  zdao.obrisi(id).then((zanr)=> {
    odgovor.send(JSON.stringify(zanr));
  });
};

exports.deleteZanrBezFilmova= function (zahtjev, odgovor) { 
  odgovor.type("application/json");
  let tijelo=zahtjev.body;
  let zdao=new ZanrDAO();
  zdao.obrisiBezFilma(tijelo).then((greska)=> {
    console.log(greska);
    odgovor.send(JSON.stringify(greska));
  });
};

exports.putZanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let korime = zahtjev.params.korime;
  let podaci = zahtjev.body;
  let zdao = new ZanrDAO();
  zdao.azuriraj(korime, podaci).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

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

exports.putTMDBzanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};


exports.deleteTMDBzanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};
