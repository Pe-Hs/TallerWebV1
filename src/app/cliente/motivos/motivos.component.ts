import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehiculo } from '../../vehiculo/interface/vehiculo.interface';
import { DetallesComponent } from '../detalles/detalles.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoService } from '../../taller/service/motivo.service';

@Component({
  selector: 'app-motivos',
  templateUrl: './motivos.component.html',
  styles: [
  ]
})
export class MotivosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public vehiculo: Vehiculo,
              private motivoService : MotivoService,
              private matDialogRef: MatDialogRef<DetallesComponent>) {

  }

  dataSource = new MatTableDataSource();
  displayedColumns : string[] = ['fecha','descripcion']

  close() {
    this.matDialogRef.close();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;


    this.motivoService.getMotivobyVehiculoId(this.vehiculo.idVehiculo)
      .subscribe(resp => this.dataSource.data = resp)

    this.matDialogRef.updateSize('40%', 'auto'); 
  }

}
