const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js")
const totp = require("./moduli/totp.js")
const Autentifikacija = require("./autentifikacija.js")
let auth = new Autentifikacija();
const Konfiguracija = require("../konfiguracija");

let konf=new Konfiguracija();

let restport;

konf.ucitajKonfiguraciju().then(()=> {
    let objekt=konf.dajKonf();
    restport=objekt["rest.port"]

    console.log("Restport procitan iz datoteke je"+restport);
});





var uloga;

exports.pocetna = async function (zahtjev, odgovor) {
    uloga = zahtjev.session.uloga_id
    let pocetna = await ucitajStranicu("pocetna")

    odgovor.send(pocetna);
}

exports.dajKorisnicko = async function (zahtjev, odgovor) {

    odgovor.json({ data: zahtjev.session.korime })

}

exports.dajIme = async function (zahtjev, odgovor) {

    odgovor.json({ data: zahtjev.session.ime })
}

exports.dajPrezime = async function (zahtjev, odgovor) {

    odgovor.json({ data: zahtjev.session.prezime })
}

exports.dajEmail = async function (zahtjev, odgovor) {

    odgovor.json({ data: zahtjev.session.email })
}

exports.dajLozinku = async function (zahtjev, odgovor) {

    odgovor.json({ data: zahtjev.session.lozinka })
}

exports.UbaciMojZanr = async function (zahtjev, odgovor) {
    body = zahtjev.body;
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let params = {
        method: "POST",
        body: JSON.stringify(zahtjev.body),
        headers: zaglavlje
    }


    let Fetch = await fetch("http://localhost:"+restport+"/api/zanr", params)


    if (Fetch.status == 200) {
        console.log("Status mi je 200");

    }
}


exports.AzurirajMojZanr = async function (zahtjev, odgovor) {
    body = zahtjev.body;
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let params = {
        method: "PUT",
        body: JSON.stringify(zahtjev.body),
        headers: zaglavlje
    }

    //let Fetch = await fetch("http://spider.foi.hr:12235/api/zanr/:id", params)
    let Fetch = await fetch("http://localhost:"+restport+"/api/zanr/:id", params)


    if (Fetch.status == 200) {
        console.log("Status mi je 200");

    }
}

exports.AzurirajKorisnika = async function (zahtjev, odgovor) {

    body = zahtjev.body;
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let params = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: zaglavlje
    }


    let Fetch = await fetch("http://localhost:"+restport+"/api/korisnici/:korime", params)
    //ovo tu je iz nekog razloga prazno


    if (Fetch.status == 200) {
        console.log("Status mi je 200");

    }

    else console.log("Status je" + Fetch.status);
}

exports.ObrisiMojZanr = async function (zahtjev, odgovor) {


    body = zahtjev.body;
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");

    let params = {
        method: "DELETE",
        body: JSON.stringify(zahtjev.body),
        headers: zaglavlje
    }



    let Fetch = await fetch("http://localhost:"+restport+"/api/zanr/", params)


    if (Fetch.status == 200) {
        console.log("Status mi je 200");

    }
}

exports.zanrovi = async function (zahtjev, odgovor) {
    let zanrovi = await ucitajStranicu("zanrovi")
    odgovor.send(zanrovi);
}

exports.dokumentacija = async function (zahtjev, odgovor) {
    let dokumentacija = await ucitajStranicu("dokumentacija")
    odgovor.send(dokumentacija);
}

exports.profil = async function (zahtjev, odgovor) {
    let profil = await ucitajStranicu("profil")
    odgovor.send(profil);
}

exports.galerija = async function (zahtjev, odgovor) {
    let galerija = await ucitajStranicu("galerija_slika")
    odgovor.send(galerija);
}

exports.slike = async function (zahtjev, odgovor) {
    let slike = await ucitajStranicu("slika")
    odgovor.send(slike);
}

exports.filmoviPregled = async function (zahtjev, odgovor) {
    let filmoviPregled = await ucitajStranicu("filmovi_pregled")
    odgovor.send(filmoviPregled);
}

exports.film = async function (zahtjev, odgovor) {
    let film = await ucitajStranicu("film")
    odgovor.send(film);
}

exports.korisnici = async function (zahtjev, odgovor) {
    let korisnici = await ucitajStranicu("korisnici")
    odgovor.send(korisnici);
}



exports.filmoviPrijedlozi = async function (zahtjev, odgovor) {
    let filmPrijedlog = await ucitajStranicu("filmovi_prijedlozi")
    odgovor.send(filmPrijedlog);
}



exports.registracija = async function (zahtjev, odgovor) {

    let greska = "";
    if (zahtjev.method == "POST") {
        let uspjeh = await auth.dodajKorisnika(zahtjev.body);
        if (uspjeh) {
            //odgovor.redirect("/prijava");
            return;
        } else {
            greska = "Dodavanje nije uspjelo provjerite podatke!";
        }
    }

    let stranica = await ucitajStranicu("registracija", greska);
    odgovor.send(stranica);
}

exports.odjava = async function (zahtjev, odgovor) {
    zahtjev.session.korisnik = null;
    // zahtjev.session.korime = null;
    //zahtjev.session.lozinka = null;
    odgovor.redirect("/");
};

exports.prijava = async function (zahtjev, odgovor) {
    let greska = ""
    if (zahtjev.method == "POST") {
        var korime = zahtjev.body.korime;
        var lozinka = zahtjev.body.lozinka;
        var korisnik = await auth.prijaviKorisnika(korime, lozinka);

        var rez = JSON.parse(korisnik);


        if (korisnik) {

           /* let totpKljuc = rez.totpKljuc;
            let totpKod = zahtjev.body.totp;
            if (rez.aktivan != 1) {
                greska = "Nije aktiviran";
            }
            else if (!totp.provjeriTOTP(totpKod, totpKljuc)) {
                greska = "TOTP nije dobar!"
            } else {
*/
                zahtjev.session.jwt = jwt.kreirajToken(korisnik)

                JSON.parse(korisnik);

                zahtjev.session.korisnik = rez.ime + " " + rez.prezime;
                zahtjev.session.korime = rez.korime;
                zahtjev.session.email = rez.email;
                zahtjev.session.ime = rez.ime;
                zahtjev.session.prezime = rez.prezime;
                zahtjev.session.lozinka = rez.lozinka;
                zahtjev.session.uloga_id = rez.uloga_id;
                //odgovor.redirect("/");

                odgovor.send(JSON.parse(korisnik));

                console.log(JSON.parse(korisnik));

                return;
            //}
        } else {
            greska = "Netocni podaci!";
        }
    }

    let stranica = await ucitajStranicu("prijava", greska);
    odgovor.send(stranica);
}


exports.filmoviPretrazivanje = async function (zahtjev, odgovor) {
    let stranica = await ucitajStranicu("filmovi_pretrazivanje");
    odgovor.send(stranica);
}

function UcitajNavigaciju(broj) {
    if (broj == 1) {
        return 1;
    }

    if (broj == 2) {
        return 2;
    }
}

async function ucitajStranicu(nazivStranice, poruka = "") {

    var stranice;

    if (UcitajNavigaciju(uloga) != 1 && UcitajNavigaciju(uloga) != 2) {
        stranice = [ucitajHTML(nazivStranice),
        ucitajHTML("navigacija3")];
    }


    if (UcitajNavigaciju(uloga) == 1) {
        stranice = [ucitajHTML(nazivStranice),
        ucitajHTML("navigacija")];
    }

    if (UcitajNavigaciju(uloga) == 2) {
        stranice = [ucitajHTML(nazivStranice),
        ucitajHTML("navigacija2")];
    }


    let [stranica, nav] = await Promise.all(stranice);
    stranica = stranica.replace("#navigacija#", nav);
    stranica = stranica.replace("#poruka#", poruka)
    return stranica;
}

function ucitajHTML(htmlStranica) {
    return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}