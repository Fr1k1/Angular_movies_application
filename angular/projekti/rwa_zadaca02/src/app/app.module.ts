import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ZanroviComponent } from './zanrovi/zanrovi.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PregledFilmovaComponent } from './pregled-filmova/pregled-filmova.component';
import { PretrazivanjeFilmovaComponent } from './pretrazivanje-filmova/pretrazivanje-filmova.component';
import { ProfilComponent } from './profil/profil.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { NavigacijaRuteComponent } from './navigacija-rute/navigacija-rute.component';
import { PrijedloziFilmovaComponent } from './prijedlozi-filmova/prijedlozi-filmova.component';
import { FormsModule } from '@angular/forms';
import { OdabraniFilmComponent } from './odabrani-film/odabrani-film.component';
//import { RecaptchaModule } from 'ng-recaptcha';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PocetnaComponent,
    ZanroviComponent,
    PrijavaComponent,
    RegistracijaComponent,
    PregledFilmovaComponent,
    PretrazivanjeFilmovaComponent,
    ProfilComponent,
    DokumentacijaComponent,
    KorisniciComponent,
    NavigacijaRuteComponent,
    PrijedloziFilmovaComponent,
    OdabraniFilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
