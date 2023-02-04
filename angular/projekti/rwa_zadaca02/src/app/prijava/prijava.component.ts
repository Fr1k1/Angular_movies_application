import { Component } from '@angular/core';
import { KorisniciService } from '../servisi/korisnici.service';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss'],
})
export class PrijavaComponent {
  korime: string = ''; 
  lozinka: string = '';
  captcha: string = '';

  constructor(private korisniciService: KorisniciService) {
    this.captcha='';
  }



  async login() {
    let odgovor = await this.korisniciService.prijaviKorisnika(
      this.korime,
      this.lozinka
    );
    sessionStorage.setItem('korisnik', odgovor.uloga_id);
    sessionStorage.setItem('korime', odgovor.korime);
    sessionStorage.setItem('ime', odgovor.ime);
    sessionStorage.setItem('prezime', odgovor.prezime);
    sessionStorage.setItem('email', odgovor.email);
    sessionStorage.setItem('lozinka', odgovor.lozinka);
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log('Captcha je' + this, this.captcha);
  }
}
