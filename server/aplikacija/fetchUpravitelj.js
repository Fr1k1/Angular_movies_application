const FilmoviPretrazivanje = require("./filmoviPretrazivanje.js");
const jwt = require("./moduli/jwt.js")
const Autentifikacija = require("./autentifikacija.js")
let auth = new Autentifikacija();
let fp = new FilmoviPretrazivanje();
const Konfiguracija = require("../konfiguracija");

let konf=new Konfiguracija();

let restport;



konf.ucitajKonfiguraciju().then(()=> {
    let objekt=konf.dajKonf();
    restport=objekt["rest.port"]

    console.log("Restport procitan iz datoteke je"+restport);
});

exports.aktvacijaRacuna = async function (zahtjev, odgovor) {
    console.log(zahtjev.query);
    let korime = zahtjev.query.korime;
    let kod = zahtjev.query.kod;

    let poruka = await auth.aktivirajKorisnickiRacun(korime, kod);

    if (poruka.status == 200) {
        odgovor.send(await poruka.text());
    } else {
        odgovor.send(await poruka.text());
    }
}



exports.DajMojeZanrove = async function (zahtjev, odgovor) {

    odgovor.json(await fp.dohvatiMojeZanrove());


}

exports.DajMojeKorisnike = async function (zahtjev, odgovor) {

    odgovor.json(await fp.dohvatiMojeKorisnike());


}

exports.DajMojeFilmove = async function (zahtjev, odgovor) {

    odgovor.json(await fp.dohvatiMojeFilmove());


}

exports.dajSveZanrove = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dohvatiSveZanrove());
}
exports.dajDvaFilma = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dohvatiNasumceFilm(zahtjev.query.zanr))
}

exports.dajDvaMojaFilma = async function (zahtjev, odgovor) {
    odgovor.json(await fp.dohvatiNasumceMojFilm(zahtjev.query.zanr))
}

exports.getJWT = async function (zahtjev, odgovor) {

    odgovor.type('json')
    if (zahtjev.session.jwt != null) {
        let k = { korime: jwt.dajTijelo(zahtjev.session.jwt).korime };
        let noviToken = jwt.kreirajToken(k)
        odgovor.send({ ok: noviToken });
        return noviToken;
    }
    odgovor.status(401);
    odgovor.send({ greska: "nemam token!" });
}

exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {

    let str = zahtjev.query.str;
    let filter = zahtjev.query.filter;
    odgovor.json(await fp.dohvatiFilmove(str, filter))

}

exports.dodajFilm = async function (zahtjev, odgovor) {

    body = zahtjev.body;
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let params = {
        method: "POST",
        body: JSON.stringify(zahtjev.body),
        headers: zaglavlje
    }


    let Fetch = await fetch("http://localhost:"+restport+"/api/filmovi", params)


    if (Fetch.status == 200) {


    }

    odgovor.json({ ok: "OK" });

}
