import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistroComponent } from '../registro/registro.component';
import { Vehiculo } from '../../vehiculo/interface/vehiculo.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from '../../vehiculo/service/vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styles: [
  ]
})
export class VehiculosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  
  constructor(private dialogRef : MatDialogRef<RegistroComponent>,
              @Inject(MAT_DIALOG_DATA) public idCliente : string,
              private vehiculoService: VehiculoService) { }

  dataSource = new MatTableDataSource<Vehiculo>();
  displayedColumns: string[] = ['actions','placa','marca','modelo','color'];  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  seleccionarVehiculo(vehiculo : Vehiculo){
    this.dialogRef.close(vehiculo)
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.vehiculoService.getVehiculosbyIdCliente(this.idCliente)
      .subscribe(resp => this.dataSource.data = resp)
    this.dialogRef.updateSize('50%', 'auto');
  }

  close(){
    this.dialogRef.close({data: '--'});
  }

}
