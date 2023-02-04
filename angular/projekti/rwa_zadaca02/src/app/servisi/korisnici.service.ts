import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { KorisniciI } from '../sucelja/KorisniciI';

@Injectable({
  providedIn: 'root',
})
export class KorisniciService {
  constructor() {}

  async dajKorisnikeREST() {
    let korisnici = new Array<KorisniciI>();
    let o = await fetch(environment.restServis + 'korisnici');
    korisnici = JSON.parse(await o.text()) as Array<KorisniciI>;

    console.log(korisnici);
    return korisnici;
  }

  private varijabla: any = JSON.stringify(this.dajKorisnikeREST());

  async prijaviKorisnika(korime: string, lozinka: string) {
    //lozinka = kodovi.kreirajSHA256(lozinka, 'moja sol');
    let tijelo = {
      korime: korime,
      lozinka: lozinka,
    };

    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');

    let parametri = {
      method: 'POST',
      body: JSON.stringify(tijelo),
      headers: zaglavlje,
    };

    console.log('Tijelo je' + parametri.body);
    /* let odgovor = await fetch(
      'http://localhost:9000/api/korisnici/' + korime + '/prijava',
      parametri
    );*/

    let odgovor = await fetch(environment.appServis + 'prijava', parametri);

    if (odgovor.status == 200) {
      // sessionStorage.setItem('korisnik',parametri.body.korime); nekak mu trebam ulogu poslati
      let podaci = await odgovor.text();
      console.log('Podaci su' + podaci); //ovo tu bi se moralo poslati tam v onu komponentu za profil

      return JSON.parse(podaci);
      //return await odgovor.text();
    } else {
      return false;
    }
  }

  async dajMojegKorisnika(mojKorisnik: any) {
    let odgovor = await fetch(
      environment.restServis + 'korisnici/' + mojKorisnik
    );

    if (odgovor.status == 200) {
      // sessionStorage.setItem('korisnik',parametri.body.korime); nekak mu trebam ulogu poslati
      let podaci = await odgovor.text();
      console.log('Moj korisnik je' + podaci); //ovo tu bi se moralo poslati tam v onu komponentu za profil

      return JSON.parse(podaci);
    }
  }

  /* async RegistrirajKorisnika(ime:string, prezime:string, email:string, korisnicko:string, lozinka:string) {
    let body = {
        ime: ime,
        prezime: prezime,
        email: email,
        korisnicko: korisnicko,
        lozinka: lozinka
    }

    console.log("Dolazim u servis");

    

    let header = new Headers();
    header.set("Content-Type", "application/json");

    let parametri = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: header
    }

    console.log("Dolazim do fetcha");
    //tu crasha
    let podaci = await fetch('http://localhost:9000/api/korisnici/', parametri);
    await podaci.text();

    console.log("Presel sam fetch");

}*/

  async RegistrirajKorisnika(
    ime: string,
    prezime: string,
    email: string,
    korisnicko: string,
    lozinka: string
  ) {
    console.log('Pozivam se dodaj korisnika');
    let tijelo = {
      ime: ime,
      prezime: prezime,
      lozinka: lozinka,
      email: email,
      korime: korisnicko,
    };

    console.log(tijelo);


    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');

    let parametri = {
      method: 'POST',
      body: JSON.stringify(tijelo),
      headers: zaglavlje,
    };

    let odgovor = await fetch(
      environment.appServis + 'registracija',
      parametri
    );

    if (odgovor.status == 200) {
      console.log('Ubacen na servis');
      return true;
    } else {
      console.log(odgovor.status);
      console.log(await odgovor.text());
      return false;
    }
  }




  async AzurirajKorisnika(ime: string, prezime: string, korime: string) {
    console.log('Ulazim u azuriraj korisnika');

    let body = {
      ime: ime,
      prezime: prezime,
      korime: korime,
    };

    let header = new Headers();
    header.set('Content-Type', 'application/json');

    let parametri = {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: header,
    };

    let podaci = await fetch(
      environment.restServis + 'korisnici/' + korime,
      parametri
    );
    await podaci.text();

    console.log('Presel sam fetch za update');
  }
}
