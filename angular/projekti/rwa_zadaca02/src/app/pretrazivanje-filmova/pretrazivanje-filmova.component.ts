import { Component } from '@angular/core';
import { FilmoviService } from '../servisi/filmovi.service';

@Component({
  selector: 'app-pretrazivanje-filmova',
  templateUrl: './pretrazivanje-filmova.component.html',
  styleUrls: ['./pretrazivanje-filmova.component.scss'],
})
export class PretrazivanjeFilmovaComponent {
  poljeFilmova: any;

  vrijednostFiltera: any;

  id_novogFilma: any;

  postaviSesiju() {
    sessionStorage.setItem(
      'dohvaceniFilmovi',
      JSON.stringify(this.poljeFilmova)
    );
  }

  constructor(private filmoviService: FilmoviService) {}

  async ngOnInit(): Promise<void> {
    this.poljeFilmova = JSON.parse(
      await this.filmoviService.dohvatiTMDBFilmove('love', 1)
    ).results;

    this.postaviSesiju();
  }

  async dajFilmove(): Promise<void> {
    this.poljeFilmova = JSON.parse(
      await this.filmoviService.dohvatiTMDBFilmove(this.vrijednostFiltera, 1)
    ).results;

    this.postaviSesiju();

    let parametri = { method: 'POST' };

    let odgovor = await fetch(
      '/filmoviPretrazivanje?str=1&filter=' + this.vrijednostFiltera,
      parametri
    );
    let podaci = await odgovor.text();

    podaci = JSON.parse(podaci);
  }

  async dodajUBazu(id: number): Promise<void> {
    this.filmoviService.dodajFilmUBazuPretrazivanje(id);
  }
}
