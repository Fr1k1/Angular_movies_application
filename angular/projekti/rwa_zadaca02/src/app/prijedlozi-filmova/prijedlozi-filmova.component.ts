import { Component, OnInit } from '@angular/core';
import { FilmoviService } from '../servisi/filmovi.service';

@Component({
  selector: 'app-prijedlozi-filmova',
  templateUrl: './prijedlozi-filmova.component.html',
  styleUrls: ['./prijedlozi-filmova.component.scss'],
})
export class PrijedloziFilmovaComponent implements OnInit {
  neodobreni: any;

  constructor(private filmoviService: FilmoviService) {}

  async ngOnInit(): Promise<void> {
    this.neodobreni = await this.filmoviService.dohvatiMojeFilmove();
    console.log(this.neodobreni); 
  }

  async odobri(id: Number) {
    await this.filmoviService.odobriFilm(id);
    this.neodobreni = await this.filmoviService.dohvatiMojeFilmove();
  }

  async izbaciIzBaze(id: number) {
    console.log('Izbacil budem' + id);
    await this.filmoviService.makniPrijedlog(id);
    this.neodobreni = await this.filmoviService.dohvatiMojeFilmove();
  }


}
