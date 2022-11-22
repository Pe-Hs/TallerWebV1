import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenesService } from '../service/ordenes.service';
import { Orden } from '../interfaces/orden.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  
  dataSource = new MatTableDataSource<Orden>();

  myDate = new Date();

  displayedColumns: string[] = ['codigoOrden','placa','marca','nombreCliente','nombreUsuario','actions'];
  
  constructor(private OrdenesService: OrdenesService,
    private matDialog: MatDialog,
              ) {  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;   
    this.OrdenesService.getOrdenes()
      .subscribe(ordenes => this.dataSource.data = ordenes)
  }

  detallesOrden(orden : Orden){
    const matDialogConfig = new MatDialogConfig();

    matDialogConfig.disableClose = true;
    matDialogConfig.data = orden;

    this.matDialog.open(DetallesComponent ,matDialogConfig);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
