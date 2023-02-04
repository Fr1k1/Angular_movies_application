const Baza = require("./baza.js");

class FilmDAO {
  constructor() {
    this.baza = new Baza();
  }

  dajSve = async function () {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM film;";
    var podaci = await this.baza.izvrsiUpit(sql, []);
    this.baza.zatvoriVezu();
    return podaci;
  };

  daj = async function (id) {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM film WHERE id=?;";
    var podaci = await this.baza.izvrsiUpit(sql, [id]);
    this.baza.zatvoriVezu();
    if (podaci.length == 1) return podaci[0];
    else return null;
  };

  dodaj = async function (film) {
    let sql = `INSERT INTO film (adult,backdrop_path, id, original_language, original_title,
      overview,popularity,poster_path,release_date,title,video,vote_average,vote_count
       ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    let podaci = [
      film.adult,
      film.backdrop_path,
      film.id,
      film.original_language,
      film.original_title,
      film.overview,
      film.popularity,
      film.poster_path,
      film.release_date,
      film.title,
      film.video,
      film.vote_average,
      film.vote_count,
      
    ];
    await this.baza.izvrsiUpit(sql, podaci);
    return true;
  };

  /*obrisi = async function (id, cijeliFilm) {
    console.log(" prvo Obrisal sam, dobil sam id"+id+ cijeliFilm.id);

    this.baza.spojiSeNaBazu();
    let sql = 'DELETE FROM film WHERE id=?;';
    await this.baza.izvrsiUpit(sql, [cijeliFilm.id]);
    console.log("Obrisal sam, dobil sam id"+id);
    this.baza.zatvoriVezu();
    return true;
  };*/

  obrisi = async function (id) {
    console.log(" prvo Obrisal sam, dobil sam id"+id);

    this.baza.spojiSeNaBazu();
    let sql = 'DELETE FROM film WHERE id=?;';
    await this.baza.izvrsiUpit(sql, [id]);
    console.log("Obrisal sam, dobil sam id"+id);
    this.baza.zatvoriVezu();
    return true;
  };

  azuriraj = async function (id, film) {
    let sql = `UPDATE film SET odobreno=? WHERE id=?`;
    let podaci = [
      1, film.id,
    ];
    await this.baza.izvrsiUpit(sql, podaci);
    return true;
  };
}

module.exports = FilmDAO;
