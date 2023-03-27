import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { VehiculoFormComponent } from './components/vehiculos/vehiculo-form/vehiculo-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { DatosVehiculoComponent } from './components/vehiculos/datos-vehiculo/datos-vehiculo.component';
import { NavComponent } from './components/nav/nav.component';
import { ViajesComponent } from './components/viajes/viajes.component';
import { ViajeFormComponent } from './components/viajes/viaje-form/viaje-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalSelectVehiculoComponent } from './components/modal/modal-select-vehiculo/modal-select-vehiculo.component';
import { SelectTipoVehiculoComponent } from './components/select-tipo-vehiculo/select-tipo-vehiculo.component';
import { FiltrosComponent } from './components/viajes/filtros/filtros.component';
import { SelectCiudadesComponent } from './components/select-ciudades/select-ciudades.component';
import { DatosViajeComponent } from './components/viajes/datos-viaje/datos-viaje.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { CiudadFormComponent } from './components/ciudades/ciudad-form/ciudad-form.component';
import { DatosCiudadComponent } from './components/ciudades/datos-ciudad/datos-ciudad.component';
import { TiposVehiculoComponent } from './components/tipos-vehiculo/tipos-vehiculo.component';
import { TipoVehiculoFormComponent } from './components/tipos-vehiculo/tipo-vehiculo-form/tipo-vehiculo-form.component';
import { DatosTipoVehiculoComponent } from './components/tipos-vehiculo/datos-tipo-vehiculo/datos-tipo-vehiculo.component';

@NgModule({
  declarations: [
    AppComponent,
    VehiculosComponent,
    VehiculoFormComponent,
    ModalComponent,
    DatosVehiculoComponent,
    NavComponent,
    ViajesComponent,
    ViajeFormComponent,
    ModalSelectVehiculoComponent,
    SelectTipoVehiculoComponent,
    FiltrosComponent,
    SelectCiudadesComponent,
    DatosViajeComponent,
    CiudadesComponent,
    CiudadFormComponent,
    DatosCiudadComponent,
    TiposVehiculoComponent,
    TipoVehiculoFormComponent,
    DatosTipoVehiculoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
