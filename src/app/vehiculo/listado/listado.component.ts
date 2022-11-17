import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from '../service/vehiculo.service';
import { Vehiculo } from '../interface/vehiculo.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit,  AfterViewInit {

  myDate = new Date();

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource = new MatTableDataSource<Vehiculo>();
  displayedColumns :string [] = ['placa', 'marca', 'modelo','color','actions']

  constructor(private vehiculoService: VehiculoService,
  private matDialog: MatDialog) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detallesVehiculo(vehiculo : Vehiculo){
    const matDialogConfig = new MatDialogConfig();

    matDialogConfig.disableClose= true;
    matDialogConfig.data = vehiculo;

    this.matDialog.open(DetallesComponent, matDialogConfig)
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.vehiculoService.getVehiculos()
      .subscribe(resp => this.dataSource.data = resp)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
