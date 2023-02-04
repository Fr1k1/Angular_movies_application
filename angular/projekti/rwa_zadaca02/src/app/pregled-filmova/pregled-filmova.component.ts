import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FilmoviService } from '../servisi/filmovi.service';

@Component({
  selector: 'app-pregled-filmova',
  templateUrl: './pregled-filmova.component.html',
  styleUrls: ['./pregled-filmova.component.scss']
})
export class PregledFilmovaComponent implements OnInit {


    constructor (private filmoviService:FilmoviService)  {}

    odobreni:any;

      async ngOnInit(): Promise<void> {
        this.odobreni=await this.filmoviService.dohvatiMojeFilmove();
        console.log(this.odobreni); 
      }
    
    }

