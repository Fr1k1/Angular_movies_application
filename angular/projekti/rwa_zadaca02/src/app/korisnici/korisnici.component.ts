import { Component } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.scss'],
})
export class KorisniciComponent {
  varijabla: any;

  constructor(private korisniciService: KorisniciService) {}

  async dohvatiMojeKorisnike(): Promise<void> {
    this.varijabla = await this.korisniciService.dajKorisnikeREST();
  }
  
}
