import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StepperComponent } from '../stepper/stepper.component';
import { ClienteService } from '../../cliente/services/cliente.service';
import { DataTaller } from '../interface/data.interface';
import { Router } from '@angular/router';
import { Stepper2Component } from '../stepper2/stepper2.component';
import { Stepper3Component } from '../stepper3/stepper3.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private clienteService: ClienteService,
    private router: Router,
    private dialog: MatDialog,) { }

  dataTaller: DataTaller = {
    nroClientes: '',
  }

  ngOnInit(): void {
    this.clienteService.getNroClientes()
      .subscribe(resp => this.dataTaller = resp[0])
  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {

    const url = self ? this.router.url : urlToNavigateTo;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
      })
    })

  }

  clienteNuevo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    this.dialog.open(StepperComponent, dialogConfig)

    dialogConfig.position = {
      top: '',
      left: '',
    }
  }

  vehiculoNuevo(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    this.dialog.open(Stepper2Component, dialogConfig)

    dialogConfig.position = {
      top: '',
      left: '',
    }
  }

  motivoNuevo(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    this.dialog.open(Stepper3Component, dialogConfig)

    dialogConfig.position = {
      top: '',
      left: '',
    }
  }

  fechaHoy = new Date();
  
  date(){
    const fechaHoy = new Date();
    const format = 'yyyy-MM-dd';
    const locale = 'en-EN';
    const formatDates = formatDate(fechaHoy, format, locale )
    console.log(formatDates)
  }

}
