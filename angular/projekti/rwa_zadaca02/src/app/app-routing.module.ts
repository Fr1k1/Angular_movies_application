import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { OdabraniFilmComponent } from './odabrani-film/odabrani-film.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PregledFilmovaComponent } from './pregled-filmova/pregled-filmova.component';
import { PretrazivanjeFilmovaComponent } from './pretrazivanje-filmova/pretrazivanje-filmova.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PrijedloziFilmovaComponent } from './prijedlozi-filmova/prijedlozi-filmova.component';
import { ProfilComponent } from './profil/profil.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ZanroviComponent } from './zanrovi/zanrovi.component';

const routes: Routes = [
{path:'pocetna',component:PocetnaComponent},
{path:'prijava',component:PrijavaComponent},
{path:'registracija',component:RegistracijaComponent},
{path:'zanrovi',component:ZanroviComponent},
{path:'filmoviPregled',component:PregledFilmovaComponent},
{path:'filmoviPretrazivanje',component:PretrazivanjeFilmovaComponent},
{path:'filmoviPrijedlozi',component:PrijedloziFilmovaComponent},
{path:'profil',component:ProfilComponent},
{path:'dokumentacija',component:DokumentacijaComponent},
{path:'korisnici',component:KorisniciComponent},
{path:'', redirectTo:'/pocetna',pathMatch:'full'},
{path:'filmoviPregled/odabraniFilm/:id',component:OdabraniFilmComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
