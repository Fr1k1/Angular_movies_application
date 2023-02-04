const konst = require("../konstante.js");
//const portRest = require(konst.dirPortova + "portovi_rest.js").mfriscic20;
const url = "http://localhost:9000" + "/api";
const kodovi = require("./moduli/kodovi.js");
class FilmoviZanroviPretrazivanje {
  async dohvatiFilmove(stranica, kljucnaRijec = "") {
    let putanja =
      url +
      "/tmdb/filmovi?stranica=" +
      stranica +
      "&kljucnaRijec=" +
      kljucnaRijec;
    let odgovor = await fetch(putanja);
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
  }

  async dohvatiSveZanrove() {
    let odgovor = await fetch(url + "/tmdb/zanr");
    let podaci = await odgovor.text();

    let zanrovi = JSON.parse(podaci).genres;
    return zanrovi;
  }

  async dohvatiMojeZanrove() {
    let odgovor = await fetch("http://localhost:9000/api/zanr");
    let podaci = await odgovor.text();

    let zanrovi = JSON.parse(podaci);
    return zanrovi;
  }

  async dohvatiMojeFilmove() {

    //let odgovor = await fetch("http://spider.foi.hr:12235/api/filmovi");
    let odgovor = await fetch("http://localhost:9000/api/filmovi");

    let podaci = await odgovor.text();

    let filmovi = JSON.parse(podaci);
    return filmovi;
  }

  async dohvatiMojeKorisnike() {
    let odgovor = await fetch("http://localhost:9000/api/korisnici");
    let podaci = await odgovor.text();
    let korisnici = JSON.parse(podaci);
    return korisnici;
  }



  async dohvatiNasumceFilm(zanr) {
    //TODO čitaj iz ispravnog servisa
    let odgovor = await fetch(
      url + "/tmdb/filmovi?stranica=1&kljucnaRijec=love"
    );
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    let rez = [
      filmovi.results[kodovi.dajNasumceBroj(0, 20)],
      filmovi.results[kodovi.dajNasumceBroj(0, 20)],
    ];
    return rez;
  }


  //ovo je moja funkcija
  async dohvatiNasumceMojFilm(zanr) {
    //TODO čitaj iz ispravnog servisa
    let odgovor = await fetch(
      url + "/tmdb/filmovi?stranica=1&kljucnaRijec=comedy"
    );
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    let rez = [
      filmovi.results[kodovi.dajNasumceBroj(0, 20)],
      filmovi.results[kodovi.dajNasumceBroj(0, 20)],
    ];
    return rez;
  }
}

module.exports = FilmoviZanroviPretrazivanje;
