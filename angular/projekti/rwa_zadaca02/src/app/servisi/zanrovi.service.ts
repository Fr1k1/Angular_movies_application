import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ZanroviI } from '../sucelja/ZanroviI';

@Injectable({
  providedIn: 'root',
})
export class ZanroviService {
  async dajZanroveREST() {
    let zanrovi = new Array<ZanroviI>();
    let o = await fetch(environment.restServis+'zanr');
    zanrovi = JSON.parse(await o.text()) as Array<ZanroviI>;

    console.log(zanrovi);
    return zanrovi;
  }

  private varijabla: any = JSON.stringify(this.dajZanroveREST());
  private varijabla2: any = JSON.stringify(this.dajTMDBZanroveREST());

  constructor() {}

  async dajTMDBZanroveREST() {
    let zanrovi = new Array<ZanroviI>();
    let o = await fetch(environment.restServis+'tmdb/zanr');
    zanrovi = JSON.parse(await o.text()).genres as Array<ZanroviI>;

    console.log(zanrovi);
    return zanrovi;
  }

  async  azurirajZanr(id: string, naziv: string): Promise<void> {
    let body = {
      id: id,
      naziv: naziv,
    };
  
    let header = new Headers();
    header.set("Content-Type", "application/json");
  
    let parametri = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: header,
    };
  
    let podaci = await fetch(environment.restServis+"zanr/:id", parametri);
    await podaci.text();
  }

  async ObrisiZanroveBezFilmova(zanrovi: string): Promise<void> {
    let body = {
      zanrovi: zanrovi,
    };

    let header = new Headers();
    header.set('Content-Type', 'application/json');

    let parametri = {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: header,
    };

    let podaci = await fetch(environment.restServis+'zanr/', parametri); 
    await podaci.text();
  }

  async DodajMojZanr(id: string, naziv: string): Promise<void> {
    let body = {
      id: id,
      naziv: naziv,
    };

    let header = new Headers();
    header.set('Content-Type', 'application/json');

    let parametri = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: header,
    };

    let podaci = await fetch(environment.restServis+'zanr', parametri);
    await podaci.text();
  }

}
