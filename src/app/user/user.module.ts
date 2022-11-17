import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro/registro.component';
import { ListadoComponent } from './listado/listado.component';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistroComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
