const konst = require("../konstante.js");
//const express = require(konst.dirModula + "express");
const express = require("express");
const path = require("path")

const sesija = require("express-session");
const kolacici = require("cookie-parser");
const Konfiguracija = require("../konfiguracija");
//const portovi = require(konst.dirPortova + "portovi.js");
const htmlUpravitelj = require("./htmlUpravitelj.js");
const fetchUpravitelj = require("./fetchUpravitelj.js");

const cors = require('cors')
const server = express();
server.use(cors());

let konf = new Konfiguracija();


server.use(express.static(__dirname + "/angular")); 

let putanja_ostalo = path.resolve(process.cwd(), "Ostalo");

console.log(path.resolve(process.cwd(), "Ostalo"));


server.use("/Ostalo", express.static(putanja_ostalo));


function pokreniServer() {

  let objekt = konf.dajKonf();
  let appPort = objekt["app.port"]
  const port = appPort;
  //console.log("Apport procitan iz datoteke je" + port);


  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(kolacici());
  server.use(
    sesija({
      secret: konst.tajniKljucSesija,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 3 },
      resave: false,
    })
  );

  pripremiPutanjePocetna();
  pripremiPutanjeAutentifikacija();
  pripremiPutanjePretrazivanjeFilmova();
  pripremiPutanjeZanrovi();
  pripremiPutanjeDokumentacija();
  pripremiPutanjeProfil();
  pripremiPutanjeGalerija();
  pripremiPutanjeSlika();
  pripremiPutanjePregledFilmova();
  pripremiPutanjeFilm();
  pripremiPutanjePrijedlozi();
  pripremiPutanjeKorisnici();

  server.use("/js", express.static(__dirname + "/js"));
  server.use((zahtjev, odgovor) => {
    odgovor.status(404);
    var poruka = { greska: "Stranica nije pronađena!" };
    odgovor.send(JSON.stringify(poruka));
  });

  server.listen(port, () => {
    console.log(`Server pokrenut na portu: ${port}`);
  });
}

//let konf = new Konfiguracija();
konf
  .ucitajKonfiguraciju()
  .then(pokreniServer)
  .catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
      console.error("Potrebno je dati naziv datoteke");
    else console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit();
  });

function pripremiPutanjePocetna() {

  server.get("/", (zahtjev, odgovor) => {
    odgovor.redirect("/pocetna")
  })
  server.get("/pocetna", htmlUpravitelj.pocetna);
  server.get("/dajSveZanrove", fetchUpravitelj.dajSveZanrove);
  server.get("/dajDvaFilma", fetchUpravitelj.dajDvaMojaFilma);
  server.get("/dajDvaMojaFilma", fetchUpravitelj.dajDvaMojaFilma);

}

function pripremiPutanjePretrazivanjeFilmova() {
  server.get("/filmoviPretrazivanje", htmlUpravitelj.filmoviPretrazivanje);
  server.post("/filmoviPretrazivanje", fetchUpravitelj.filmoviPretrazivanje);
  server.post("/dodajFilm", fetchUpravitelj.dodajFilm);
}

function pripremiPutanjeAutentifikacija() {
  server.get("/registracija", htmlUpravitelj.registracija);
  server.post("/registracija", htmlUpravitelj.registracija);
  server.get("/odjava", htmlUpravitelj.odjava);

  server.get("/prijava", htmlUpravitelj.prijava);
  server.post("/prijava", htmlUpravitelj.prijava);
  server.get("/getJWT", fetchUpravitelj.getJWT);
  server.get("/aktivacijaRacuna", fetchUpravitelj.aktvacijaRacuna);

}



function pripremiPutanjeZanrovi() {

  server.get("/zanrovi", htmlUpravitelj.zanrovi);
  server.get("/zanroviSvi", fetchUpravitelj.DajMojeZanrove);
  server.get("/dajSveZanrove", fetchUpravitelj.dajSveZanrove);
  server.post("/dodavanjeZanra", htmlUpravitelj.UbaciMojZanr);
  server.put("/azuriranjeZanra", htmlUpravitelj.AzurirajMojZanr);
  server.delete("/brisanjeZanra", htmlUpravitelj.ObrisiMojZanr);

}

function pripremiPutanjeDokumentacija() {
  server.get("/dokumentacija", htmlUpravitelj.dokumentacija);
}

function pripremiPutanjeProfil() {
  server.get("/profil", htmlUpravitelj.profil);
  server.get("/profil/korisnicko", htmlUpravitelj.dajKorisnicko);
  server.get("/profil/ime", htmlUpravitelj.dajIme);
  server.get("/profil/prezime", htmlUpravitelj.dajPrezime);
  server.get("/profil/email", htmlUpravitelj.dajEmail);
  server.get("/profil/lozinka", htmlUpravitelj.dajLozinku);
  server.put("/UPDATE", htmlUpravitelj.AzurirajKorisnika);


}

function pripremiPutanjeGalerija() {
  server.get("/galerija", htmlUpravitelj.galerija);
}

function pripremiPutanjeSlika() {
  server.get("/slika", htmlUpravitelj.slike);
}

function pripremiPutanjePregledFilmova() {
  server.get("/filmoviPregled", htmlUpravitelj.filmoviPregled);
  server.get("/filmoviSvi", fetchUpravitelj.DajMojeFilmove);

}

function pripremiPutanjeFilm() {
  server.get("/film", htmlUpravitelj.film);
}

function pripremiPutanjeKorisnici() {
  server.get("/korisnici", htmlUpravitelj.korisnici);
  server.get("/korisniciSvi", fetchUpravitelj.DajMojeKorisnike);
}

function pripremiPutanjePrijedlozi() {
  server.get("/filmoviPrijedlozi", htmlUpravitelj.filmoviPrijedlozi);
}
