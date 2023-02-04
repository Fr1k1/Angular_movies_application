const Baza = require("./baza.js");

class KorisnikDAO {

	constructor() {
		this.baza = new Baza();
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if (podaci.length == 1)
			return podaci[0];
		else
			return null;
	}

	dodaj = async function (korisnik) {

		let sql = `INSERT INTO korisnik (ime,prezime,email,korime, lozinka,uloga_id, aktivan ) VALUES (?,?,?,?,?,?,?)`;
		let podaci = [korisnik.ime, korisnik.prezime,
		korisnik.email,
		korisnik.korime,
		korisnik.lozinka, 2,1
		];

		try {
			await this.baza.izvrsiUpit(sql, podaci);
		} catch (err) {
			console.log("Vec postoji taj clan!!");
			return;
		}
		return true;
	}

	obrisi = async function (korime) {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql, [korime]);
		return true;
	}

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET ime=?, prezime=? WHERE korime=?`;
		let podaci = [korisnik.ime, korisnik.prezime, korisnik.korime];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}

	aktiviraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET aktivan=? WHERE korime=?`;
		let podaci = [1, korime];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	}


}

module.exports = KorisnikDAO;