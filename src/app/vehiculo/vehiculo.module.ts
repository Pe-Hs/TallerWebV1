import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallesComponent } from './detalles/detalles.component';



@NgModule({
  declarations: [
    ListadoComponent,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class VehiculoModule { }
