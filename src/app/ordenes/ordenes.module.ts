import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { RegistroComponent } from './registro/registro.component';
import { MaterialModule } from '../material/material.module';
import { OrdenesRoutingModule } from './ordenes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DetallesComponent } from './detalles/detalles.component';


@NgModule({
  declarations: [
    ListadoComponent,
    RegistroComponent,
    ClientesComponent,
    VehiculosComponent,
    ServiciosComponent,
    UsuariosComponent,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    OrdenesRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrdenesModule { }
