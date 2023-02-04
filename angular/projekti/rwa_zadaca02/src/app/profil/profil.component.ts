import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  constructor(private korisniciServis: KorisniciService) {}

  korisnicko_value: any;
  ime_value: any;
  prezime_value: any;
  mail_value: any;
  lozinka_value: any;

  async ngOnInit(): Promise<void> {
    var logirani = await this.korisniciServis.dajMojegKorisnika(
      sessionStorage.getItem('korime')
    );
    this.ime_value = logirani.ime; 
    this.prezime_value = logirani.prezime;
    this.mail_value = logirani.email;
    this.lozinka_value = logirani.lozinka;
    this.korisnicko_value = logirani.korime;
  }

 

  async Azuriraj() {
    await this.korisniciServis.AzurirajKorisnika(
      this.ime_value,
      this.prezime_value,
      this.korisnicko_value
    );
    this.korisniciServis.dajMojegKorisnika(sessionStorage.getItem('korime'));
  }
}
