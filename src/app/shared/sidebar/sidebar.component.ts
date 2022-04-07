import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  get detalle(){
    return this.gifService.historial;
  }
  constructor( private gifService : GifsService) { }


  ngOnInit(): void {
  }

  buscarHistorial(busqueda : string){
    this.gifService.buscarGift(busqueda);
  }
}
