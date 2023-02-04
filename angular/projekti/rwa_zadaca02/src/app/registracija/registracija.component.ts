import { Component } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent {

  ime:string="";
  prezime:string="";
  email:string="";
  korisnicko:string="";
  lozinka:string="";

  constructor(private korisniciService:KorisniciService) {}

  registriraj() {
    console.log("Dolazim do koda komponente");
    this.korisniciService.RegistrirajKorisnika(this.ime,this.prezime, this.email, this.korisnicko, this.lozinka);

    console.log(this.ime+this.prezime);
  }

}
