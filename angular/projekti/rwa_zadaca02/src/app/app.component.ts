import { Component, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  title = 'rwa_zadaca02';
  putanja = 'nema';
  constructor(private lokacija: Location) {
    lokacija.onUrlChange((v) => {
      console.log('Promjena putanje: ' + v);
    });
  }
  ngDoCheck() {
    this.putanja = this.lokacija.path();
  }

  get isAdmin() {
    return sessionStorage.getItem('korisnik') === '1';
  }

  get nijeKorisnik() {
    return (
      sessionStorage.getItem('korisnik') !== '1' &&
      sessionStorage.getItem('korisnik') !== '2'
    );
  }

  get isUloga2() {
    return sessionStorage.getItem('korisnik') === '2';
  }

  odjavi() {
    sessionStorage.removeItem('korisnik');
  }
}
