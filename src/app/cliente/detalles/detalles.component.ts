import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cliente } from '../interfaces/cliente.interface';
import { ListadoComponent } from '../listado/listado.component';
import { Vehiculo } from '../../vehiculo/interface/vehiculo.interface';
import { VehiculoService } from '../../vehiculo/service/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MotivosComponent } from '../motivos/motivos.component';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styles: [
  ]
})
export class DetallesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public cliente : Cliente,
              private matDialog : MatDialog,
              private matDialogRef : MatDialogRef<ListadoComponent>,
              private VehiculoService: VehiculoService) { 
  }

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['actions','placa', 'marca', 'modelo'];

  vehiculos : Vehiculo[] = [];

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.VehiculoService.getVehiculosbyIdCliente(this.cliente.idCliente)
      .subscribe(resp => this.dataSource.data = resp);
    this.matDialogRef.updateSize('40%', 'auto'); 
  }

  buscarMotivos(vehiculo : Vehiculo){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.data = vehiculo;
    this.matDialog.open(MotivosComponent, dialogConfig)

    dialogConfig.position = {
      top: '0',
      left : '0'
    }

    // this.matDialogRef.close('--');
  }

  close(){
    this.matDialogRef.close('--');
  }
}
