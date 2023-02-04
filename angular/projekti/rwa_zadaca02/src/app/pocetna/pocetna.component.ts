import { Component, OnInit } from '@angular/core';
import { ZanroviService } from '../servisi/zanrovi.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss']
})
export class PocetnaComponent implements OnInit {

  varijabla:any;

  constructor(private zanroviService: ZanroviService)  {}

  async ngOnInit() {
    this.dohvatiMojeZanrove();
  }

  async dohvatiMojeZanrove(): Promise<void> {
    this.varijabla = await this.zanroviService.dajZanroveREST();
  }

}
