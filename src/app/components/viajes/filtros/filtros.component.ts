import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() tipoEvent = new EventEmitter<number>();
  recieveSelectTipo($event): void{
    this.tipoEvent.emit($event);
  }

  @Output() ciudadEvent = new EventEmitter<number>();
  recieveSelectCiudad($event): void{
    this.ciudadEvent.emit($event)
  }

  @Output() fechaEvent = new EventEmitter<string>();
  recieveSelectedDate($event): void{
    this.fechaEvent.emit($event.target.value)
  }
}
