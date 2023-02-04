const fsPromise = require("fs/promises");

module.exports = class Konfiguracija {
  constructor() {
    this.konf = {};
  }
  dajKonf() {
    return this.konf;
  }

  async ucitajKonfiguraciju() {
    var podaci = await fsPromise.readFile(process.argv[2], "UTF-8"); 
    this.konf = this.pretvoriJSONkonfig(podaci);
    console.log(this.konf);
  }

  pretvoriJSONkonfig(podaci) {
    console.log(podaci);
    let konf = {};
    var nizPodataka = podaci.split("\n");
    for (let podatak of nizPodataka) {
      var podatakNiz = podatak.split("=");
      var naziv = podatakNiz[0];
      var vrijednost = podatakNiz[1];
      konf[naziv] = vrijednost;
    }
    return konf;
  }
};

