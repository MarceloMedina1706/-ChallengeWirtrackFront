import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { TiposVehiculoComponent } from './components/tipos-vehiculo/tipos-vehiculo.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { ViajesComponent } from './components/viajes/viajes.component';

const routes: Routes = [
  {path: '', component: ViajesComponent},
  {path: 'vehiculos', component: VehiculosComponent},
  {path: 'ciudades', component: CiudadesComponent},
  {path: 'tiposVehiculo', component: TiposVehiculoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
