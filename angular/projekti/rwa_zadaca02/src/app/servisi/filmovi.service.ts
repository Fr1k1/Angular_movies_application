import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { FilmoviI } from '../sucelja/FilmoviI';

@Injectable({
  providedIn: 'root',
})
export class FilmoviService {
  constructor() {}

  async dajFilmoveREST() {
    let filmovi = new Array<FilmoviI>();
    let o = await fetch(environment.restServis + 'filmovi');
    filmovi = JSON.parse(await o.text()) as Array<FilmoviI>;

    console.log(filmovi);
    return filmovi;
  }

  async dohvatiMojeFilmove() {
    let odgovor = await fetch(environment.restServis + 'filmovi');

    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
  }

  async dohvatiTMDBFilmove(tekst:string, broj:number) {
   
    let odgovor=await fetch(environment.restServis+`tmdb/filmovi?kljucnaRijec=${tekst}&stranica=${broj}`)


    return await odgovor.text();
  }

  async odobriFilm(id: any) {
    let tijelo = {
      id: id,
    };

    let header = new Headers();
    header.set('Content-Type', 'application/json');
    let parametri = {
      method: 'PUT',
      body: JSON.stringify(tijelo),
      headers: header,
    };

    let podaci = await fetch(environment.restServis + 'filmovi/:id', parametri);
    await podaci.text();
  }

  async makniPrijedlog(idFilma: number): Promise<void> {
    let body = {
      id: idFilma,
    };

    console.log('Id je' + body.id); 

    let header = new Headers();
    header.set('Content-Type', 'application/json');

    let parametri = {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: header,
    };

    let podaci = await fetch(
      environment.restServis+
      'filmovi/' + body.id,
      parametri
    );
    await podaci.text();
  }

  async dajMojFilm(idFilma: string) {
    console.log('Id filma je' + idFilma);
    let odgovor = await fetch(environment.restServis + 'filmovi/' + idFilma);

    let podaci = await odgovor.text();

    return JSON.parse(podaci);
  }


async dodajFilmUBazuPretrazivanje(idFilma:number) {

  let sesija=sessionStorage.getItem('dohvaceniFilmovi')
  let filmovi;

  if(sesija!=null) {
   filmovi=JSON.parse(sesija);
  }
  for (let film of filmovi) {
    if (idFilma == film.id) {

      let header = new Headers();
      header.set("Content-Type", "application/json");
      let parametri = { method: "POST", body: JSON.stringify(film), headers: header };


      let odgovor = await fetch("/dodajFilm", parametri);
      if (odgovor.status == 200) {
        let podaci = await odgovor.text();
        
      } else if (odgovor.status == 401) {
      } else {
     
      }
      break;
    }
  }
}
}
  

