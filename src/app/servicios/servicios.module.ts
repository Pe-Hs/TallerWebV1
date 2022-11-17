import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { MaterialModule } from '../material/material.module';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistroComponent } from './registro/registro.component';
import { DetallesComponent } from './detalles/detalles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListadoComponent,
    RegistroComponent,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ServiciosRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ServiciosModule { }
