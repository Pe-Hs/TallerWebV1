import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TallerRoutingModule } from './taller-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from './stepper/stepper.component';
import { Stepper2Component } from './stepper2/stepper2.component';
import { Stepper3Component } from './stepper3/stepper3.component';



@NgModule({
  declarations: [
    DashboardComponent,
    StepperComponent,
    Stepper2Component,
    Stepper3Component
  ],
  imports: [
    CommonModule,
    TallerRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TallerModule { }
