const konst = require("../konstante.js");
const express = require("express");
const Konfiguracija = require("../konfiguracija");
//const portovi = require(konst.dirPortova + "portovi_rest.js"); ovo je na spideru pa nebre najti
const restKorisnik = require("./restKorisnik.js");
const restFilm = require("./restFilm.js");
const restZanr = require("./restZanr.js"); //ovi fileovi se ne prevode u typescript
const RestTMDB = require("./restTMDB.js");
const fsPromise = require("fs/promises");
const zanrDAO = require("./zanrDAO.js");
//port se sam definira, bilo koji broj more iti...definira se u csv fileu

const cors = require('cors')



//i z app i za rest u csv fileu
const server = express();
server.use(cors());

let konf = new Konfiguracija();





konf
  .ucitajKonfiguraciju()
  .then(pokreniServer)
  .catch((err) => {
    console.error(err);
    if (process.argv.length == 2)
      console.error("Potrebno je unjeti i naziv konfiguracija");
    else console.error("Ne moguce otvoriti datoteku");
    process.exit();
  });






function pokreniServer() {

  let objekt = konf.dajKonf();
  let restport = objekt["rest.port"]
  //console.log("Restport procitan iz datoteke je" + restport);
  const port = restport; 

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  pripremaPutanjeResursKorisnika();
  pripremiPutanjeResursTMDB();
  pripremaPutanjaFilmova();
  pripremaPutanjaZanrova();

  server.use((zahtjev, odgovor) => {
    odgovor.status(404);
    var odg = { greska: "Stranica nije pronadena!" };
    odgovor.send(JSON.stringify(odg));
  });

  server.listen(port, () => {
    console.log(`Server pokrenut na portu: ${port}`);
  });
}

function pripremiPutanjeResursTMDB() {
  let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
  server.get("/api/tmdb/zanr", restTMDB.getZanr.bind(restTMDB));
  server.post("/api/tmdb/zanr", restZanr.postTMDBzanr.bind(restTMDB));
  server.put("/api/tmdb/zanr", restZanr.putTMDBzanr.bind(restTMDB));
  server.delete("/api/tmdb/zanr", restZanr.deleteTMDBzanr.bind(restTMDB));



  server.get("/api/tmdb/filmovi", restTMDB.getFilmovi.bind(restTMDB));
  server.post("/api/tmdb/filmovi", restZanr.postTMDBfilmovi.bind(restTMDB));
  server.put("/api/tmdb/filmovi", restZanr.putTMDBfilmovi.bind(restTMDB));
  server.delete("/api/tmdb/filmovi", restZanr.deleteTMDBfilmovi.bind(restTMDB));


}

function pripremaPutanjeResursKorisnika() {

  server.put("/api/korisnici", restKorisnik.putKorisnici);

  server.delete("/api/korisnici", restKorisnik.deleteKorisnici);

  server.get("/api/korisnici", restKorisnik.getKorisnici);
  server.post("/api/korisnici", restKorisnik.postKorisnici);

  server.post("/api/korisnici/:korime/aktivacija", restKorisnik.postKorisnikAktivacija);



  server.post("/api/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijava);
  server.get("/api/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijavaGet);
  server.put("/api/korisnici/:korime/prijava", restKorisnik.putKorisnici);
  server.delete("/api/korisnici/:korime/prijava", restKorisnik.deleteKorisnici);



  server.get("/api/korisnici/:korime", restKorisnik.getKorisnik);
  server.post("/api/korisnici/:korime", restKorisnik.postKorisnik);
  server.put("/api/korisnici/:korime", restKorisnik.putKorisnik);

  server.put("/api/korisnici/:korime/aktivacija", restKorisnik.putKorisnikAktivacija);



  server.get("/api/korisnici/:korime/aktivacija", restKorisnik.getKorisnikAktivacija);

  server.delete("/api/korisnici/:korime/aktivacija", restKorisnik.deleteKorisnici);



  server.delete("/api/korisnici/:korime", restKorisnik.deleteKorisnik);



}

function pripremaPutanjaFilmova() {
  server.get("/api/filmovi", restFilm.getFilmovi);
  server.put("/api/filmovi", restFilm.putApiFilmovi);
  server.delete("/api/filmovi", restFilm.deleteApiFilmovi);


  server.get("/api/filmovi/:id", restFilm.getFilm);
  server.post("/api/filmovi/:id", restFilm.postFilm);
  server.delete("/api/filmovi/:id", restFilm.deletefilmovi);
  server.put("/api/filmovi/:id", restFilm.putFilm)

  server.post("/api/filmovi", restFilm.postfilmovi)

}

function pripremaPutanjaZanrova() {

  server.get("/api/zanr", restZanr.getzanrovi);
  server.post("/api/zanr", async (zahtjev, odgovor) => {
    restZanr.postZanr(zahtjev, odgovor);

  });
  server.get("/zanroviSvi", restZanr.getzanrovi);

  server.get("/api/zanr/:id", restZanr.getZanr);
  server.post("/api/zanr/:id", restZanr.postZanrId);
  server.put("/api/zanr/:id", restZanr.putZanr);

  server.delete("/api/zanr/:id", restZanr.deleteZanr);

  server.delete("/api/zanr", restZanr.deleteZanrBezFilmova);
  server.put("/api/zanr", restZanr.putzanrovi);



}
