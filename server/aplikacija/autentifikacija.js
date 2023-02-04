const konst = require("../konstante.js");
const mail = require("./moduli/mail.js");
const kodovi = require("./moduli/kodovi.js");
const Konfiguracija = require("../konfiguracija");
//const portRest = require(konst.dirPortova + "\\portovi_rest.js").mfriscic20;
//const portRest = require(konst.dirPortova + "\\portovi_rest.js").mfriscic20;

let konf=new Konfiguracija();

let restport;

konf.ucitajKonfiguraciju().then(()=> {
    let objekt=konf.dajKonf();
    restport=objekt["rest.port"]

    console.log("Restport procitan iz datoteke je"+restport);
});

const totp = require("./moduli/totp.js");
class Autentifikacija {
  async dodajKorisnika(korisnik) {

    console.log("Pozivam se dodaj korisnika");
    let tijelo = {
      ime: korisnik.ime,
      prezime: korisnik.prezime,
      lozinka: kodovi.kreirajSHA256(korisnik.lozinka, "moja sol"),
      email: korisnik.email,
      korime: korisnik.korime,
    };

    console.log(tijelo);

   /* let aktivacijskiKod = kodovi.dajNasumceBroj(10000, 99999);
    tijelo["aktivacijskiKod"] = aktivacijskiKod;
    let tajniTOTPkljuc = totp.kreirajTajniKljuc(korisnik.korime);
    tijelo["TOTPkljuc"] = tajniTOTPkljuc;*/

    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
      method: "POST",
      body: JSON.stringify(tijelo),
      headers: zaglavlje,
    };
    let odgovor = await fetch(
      "http://localhost:"+restport+"/api/korisnici",
      parametri
    );

    if (odgovor.status == 200) {
      console.log("Ubacen na servis");
      return true;
    } else {
      console.log(odgovor.status);
      console.log(await odgovor.text());
      return false;
    }
  }

 /* async aktivirajKorisnickiRacun(korime, kod) {
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
    let parametri = {
      method: "PUT",
      body: JSON.stringify({ aktivacijskiKod: kod }),
      headers: zaglavlje,
    };

    return await fetch(
      "http://spider.foi.hr:" +
      portRest +
      "/api/korisnici/" +
      korime +
      "/aktivacija",
      parametri
    );
  }*/

  async prijaviKorisnika(korime, lozinka) {

    lozinka = kodovi.kreirajSHA256(lozinka, "moja sol");
    let tijelo = {
      lozinka: lozinka,
    };


    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
      method: "POST",
      body: JSON.stringify(tijelo),
      headers: zaglavlje,
    };
    let odgovor = await fetch(
      "http://localhost:"+restport+
      
      "/api/korisnici/" +
      korime +
      "/prijava",
      parametri
    );



    if (odgovor.status == 200) {
      return await odgovor.text();
    } else {
      return false;
    }
  }
}

module.exports = Autentifikacija;
