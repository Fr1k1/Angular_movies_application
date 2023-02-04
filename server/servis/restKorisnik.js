const KorisnikDAO = require("./korisnikDAO.js");

exports.getKorisnici = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let kdao = new KorisnikDAO();
  kdao.dajSve().then((korisnici) => {
    odgovor.send(JSON.stringify(korisnici));
  });
};

exports.postKorisnici = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let podaci = zahtjev.body;
  let kdao = new KorisnikDAO();
  kdao.dodaj(podaci).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.deleteKorisnici = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnikAktivacija = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnikPrijavaGet = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnici = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana (501)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnik = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let kdao = new KorisnikDAO();
  let korime = zahtjev.params.korime;
  kdao.daj(korime).then((korisnik) => {
    odgovor.send(JSON.stringify(korisnik));
  });
};

exports.getKorisnikPrijava = function (zahtjev, odgovor) {

  console.log("Pozivam seeeeeeeeeee");

  odgovor.type("application/json");
  let kdao = new KorisnikDAO();
  let korime = zahtjev.params.korime;
  kdao.daj(korime).then((korisnik) => {

    //console.log("Na restu imam"+korisnik.lozinka+ korisnik.korime);

    console.log(korisnik);

    if (korisnik == null) {
      return;
    }


    if (korisnik.lozinka == zahtjev.body.lozinka) {

    }
    if (korisnik != null && korisnik.lozinka == zahtjev.body.lozinka) {
      odgovor.send(JSON.stringify(korisnik));
    }
    else {
      odgovor.status(401);
      odgovor.send(JSON.stringify({ greska: "Krivi podaci!" }));
    }
  });
};
exports.postKorisnik = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije dopustena (405)" };
  odgovor.send(JSON.stringify(poruka));
};

exports.deleteKorisnik = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana" };
  odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnik = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let korime = zahtjev.params.korime;
  let podaci = zahtjev.body;

  let kdao = new KorisnikDAO();
  kdao.azuriraj(korime, podaci).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.putKorisnikAktivacija = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let korime = zahtjev.params.korime;
  let podaci = zahtjev.body;
  let kdao = new KorisnikDAO();
  kdao.aktiviraj(korime, podaci).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.postKorisnikAktivacija = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije dopustena (405)" };
  odgovor.send(JSON.stringify(poruka));
};
