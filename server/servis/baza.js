
const konst = require("../konstante.js");
const mysqlLite = require("sqlite3"); 
const ds = require("fs");

class Baza {
  constructor() {
    this.db = new mysqlLite.Database("../baza.sqlite", (pogreska) => { 
      if (pogreska) {
        console.pogreskaor(pogreska.message);
      }
      
    });

  }

  spojiSeNaBazu() {
    this.db = new mysqlLite.Database("../baza.sqlite", (pogreska) => { 
      if (pogreska) {
        console.pogreskaor(pogreska.message);
      }
      
    });
  }

  ucitajPodatkeZaBazu() {
    let podaciTekst = ds.readFileSync(konst.podaciZaBazu, "UTF-8");
    this.podaciBaza = JSON.parse(podaciTekst);
  }


  izvrsiUpit(sql, podaciZaSQL, povratnaFunkcija) {
    this.db.all(sql, podaciZaSQL, povratnaFunkcija);
  }

  izvrsiUpit(sql, params = []) {
    return new Promise((uspjeh, neuspjeh) => {
      this.db.all(sql, params, (pogreska, redci_u_bazi) => {
        console.log("u izvrsi upit"+sql+params);
        if (pogreska) {
          neuspjeh(pogreska);
        }
        uspjeh(redci_u_bazi);

      });
    });
  }

  zatvoriVezu() {

    this.db.close((pogreska) => {
      if (pogreska) {
        console.pogreska(pogreska.message);
      }
      
    });

  }
}

module.exports = Baza;
