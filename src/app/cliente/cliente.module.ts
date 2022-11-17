import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado/listado.component';
import { MaterialModule } from '../material/material.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistroComponent } from './registro/registro.component';
import { BuscarComponent } from './buscar/buscar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DetallesComponent } from './detalles/detalles.component';
import { MotivosComponent } from './motivos/motivos.component';



@NgModule({
  declarations: [
    ListadoComponent,
    RegistroComponent,
    BuscarComponent,
    DetallesComponent,
    MotivosComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClienteModule { }
