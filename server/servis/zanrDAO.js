const Baza = require("./baza.js");

class ZanrDAO {
  constructor() {
    this.baza = new Baza();
  }

  dajSve = async function () {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM zanr;";
    var podaci = await this.baza.izvrsiUpit(sql, []);
    this.baza.zatvoriVezu();
    return podaci;
  };

  daj = async function (id) {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM zanr WHERE id=?;";
    var podaci = await this.baza.izvrsiUpit(sql, [id]);
    this.baza.zatvoriVezu();
    if (podaci.length == 1) return podaci[0];
    else return null;
  };

  dodaj = async function (zanr) {
    let sql = `INSERT INTO zanr (id, naziv) VALUES (?, ?)`;
    let podaci = [
      zanr.id,
      zanr.naziv
    ];
    await this.baza.izvrsiUpit(sql, podaci).catch(greska => {
      console.log(greska);
    });
    return true;
  };

  obrisi = async function (id) {
    this.baza.spojiSeNaBazu();
    let sql = "DELETE FROM zanr WHERE id=?";
    var podaci = await this.baza.izvrsiUpit(sql, [id]);
    this.baza.zatvoriVezu();
    return true;
  };

  obrisiBezFilma = async function () {
    this.baza.spojiSeNaBazu();
    let sql = "DELETE FROM zanr WHERE zanr.id NOT IN (SELECT zanr_film.zanr_id FROM zanr_film);";
    var podaci = await this.baza.izvrsiUpit(sql, []);
    this.baza.zatvoriVezu();
    return true;
  };

  azuriraj = async function (id, zanr) {
    let sql = `UPDATE zanr SET naziv=? WHERE id=?`;
    let podaci = [
      zanr.naziv,
      zanr.id,
    ];
    await this.baza.izvrsiUpit(sql, podaci);
    return true;
  };
}

module.exports = ZanrDAO;
