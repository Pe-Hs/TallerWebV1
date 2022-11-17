import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { ServiceService } from '../services/service.service';

import { Servicio } from '../interfaces/servicio.interface';
import { RegistroComponent } from '../registro/registro.component';
import { DetallesComponent } from '../detalles/detalles.component';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ],
})
export class ListadoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource = new MatTableDataSource<Servicio>();

  myDate = new Date();

  servicios : Servicio[] = [];

  servicio : Servicio | undefined;

  displayedColumns: string[] = ['nombreServicio', 'costo', 'actions'];


  constructor(private ServiceService : ServiceService,
              private dialog: MatDialog) { }

  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    this.dialog.open(RegistroComponent, dialogConfig);

    dialogConfig.position = {
      'top': '0',
      'left': '0'
    }

  }

   openDialogServicioDetalle(id: Servicio){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.data = id;

    this.dialog.open(DetallesComponent, dialogConfig);

    dialogConfig.position = {
      'top': '0',
      'left': '0'
    }

  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.ServiceService.getServicios()
      .subscribe(servicios => this.dataSource.data = servicios)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
