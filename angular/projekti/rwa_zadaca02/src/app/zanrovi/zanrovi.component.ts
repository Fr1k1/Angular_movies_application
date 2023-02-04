import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { ZanroviService } from '../servisi/zanrovi.service';

@Component({
  selector: 'app-zanrovi',
  templateUrl: './zanrovi.component.html',
  styleUrls: ['./zanrovi.component.scss'],
})
export class ZanroviComponent {
  varijabla: any;
  varijabla2: any;

  promijenjenoIme: any;
  odabraniId: any;

  constructor(private zanroviService: ZanroviService) {}

  dohvatiNoviNaziv(event: any) {
    this.promijenjenoIme = event.target.value;
  }

  async dohvatiMojeZanrove(): Promise<void> {
    this.varijabla = await this.zanroviService.dajZanroveREST();
  }

  async DodajNoviZanr() {
    await this.dohvatiOneKojiSuOznaceni()
    this.dohvatiMojeZanrove();

  }

  async dohvatiOneKojiSuOznaceni() {
    const checbox_inputi = document.querySelectorAll(
      'input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>;

    let prazni_html = '';

    var info = document.getElementById('porukica');

    const polje_oznacenih = Array.from(checbox_inputi);

    for (var i = 0; i < polje_oznacenih.length; i++) {
      if (polje_oznacenih[i].checked) {
        if (!this.ImaUBazi(polje_oznacenih[i].id))
          await this.zanroviService.DodajMojZanr(
            checbox_inputi[i].id,
            checbox_inputi[i].value
          );
        else {
          prazni_html +=
            'Zanr' + polje_oznacenih[i].value + ' je vec dodan u bazu';
          if (info !== null) info.innerHTML = prazni_html;
        }
      }
    }
  }

  ImaUBazi(id: string): boolean {
    let radio = document.querySelectorAll(
      'input[type=radio]'
    ) as NodeListOf<HTMLInputElement>;

    const polje = Array.from(radio);

    for (var i = 0; i < polje.length; i++) {
      if (polje[i].id === id) {
        console.log('Vec je unesen');
        return true;
      }
    }
    return false;
  }

  dohvatiOznaceneRadio(event: any, id: number) {
    this.odabraniId = id;
  }

  async dodatno() {
    await this.zanroviService.azurirajZanr(
      this.odabraniId,
      this.promijenjenoIme
    );
    this.dohvatiMojeZanrove();
  }

  async dohvatiMojeZanroveDelete() {
    
    let odgovor = await fetch(environment.restServis + 'zanr');

    let podaci = await odgovor.text();
    await this.zanroviService.ObrisiZanroveBezFilmova(podaci);
    this.dohvatiMojeZanrove();

    return podaci;
  }

  async dohvatiTMDBZanrove(): Promise<void> {
    this.varijabla2 = await this.zanroviService.dajTMDBZanroveREST();
  }
}
