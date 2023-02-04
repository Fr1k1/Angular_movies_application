import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmoviService } from '../servisi/filmovi.service';
import { PregledFilmovaComponent } from '../pregled-filmova/pregled-filmova.component';

@Component({
  selector: 'app-odabrani-film',
  templateUrl: './odabrani-film.component.html',
  styleUrls: ['./odabrani-film.component.scss'],
})
export class OdabraniFilmComponent implements OnInit {
  film: any;
  idFilma: any;

  constructor(
    private trenutnaRuta: ActivatedRoute,
    private servis: FilmoviService
  ) {} 
  async ngOnInit(): Promise<void> {
    this.idFilma = this.trenutnaRuta.snapshot.paramMap.get('id'); 
    console.log(this.idFilma);
    this.film = await this.servis.dajMojFilm(this.idFilma);

  }
}
