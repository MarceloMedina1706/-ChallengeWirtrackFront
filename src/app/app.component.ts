import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'viajes-front';

  public ciudades: any = [
    {id: 1, descripcion: "Buenos Aires"}, {id: 2, descripcion: "La Plata"}, {id: 3, descripcion: "Santa Fe"}
  ]

  public options: any = [
    "Buenos Aires", "La Plata", "Santa Fe"
  ]

  filteredOptions;

  filterData(enteredData){
    this.filteredOptions = this.ciudades.filter(item => {
      return item.descripcion.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }
}
