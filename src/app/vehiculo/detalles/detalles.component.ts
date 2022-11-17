import { Component, Inject, OnInit } from '@angular/core';
import { Cliente } from 'src/app/cliente/interfaces/cliente.interface';
import { Vehiculo } from '../interface/vehiculo.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListadoComponent } from '../listado/listado.component';
import { ClienteService } from '../../cliente/services/cliente.service';
import { tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoService } from '../../taller/service/motivo.service';
import { Motivo } from '../../taller/interface/motivo.interface';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styles: [
  ]
})
export class DetallesComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<ListadoComponent>,
    private clienteService: ClienteService,
    private motivoService: MotivoService,
    @Inject(MAT_DIALOG_DATA) public vehiculo: Vehiculo) { }

  cliente: Cliente = {
    idCliente: '',
    nombreCliente: '',
    apellidoCliente: '',
    email: '',
    telefono: '',
    dni: ''
  }

  motivos : Motivo[] = [];

  dataSource = new MatTableDataSource();
  displayedColumns : string[] = ['fecha','descripcion']

  ngOnInit(): void {
    this.clienteService.getClienteId(this.vehiculo.idCliente)
      .subscribe(resp => {
        this.cliente = resp[0];
      })
    this.motivoService.getMotivobyVehiculoId(this.vehiculo.idVehiculo)
      .subscribe(resp => this.dataSource.data = resp)
    this.matDialogRef.updateSize('40%', 'auto');
  }

  close() {
    this.matDialogRef.close();
  }

}
