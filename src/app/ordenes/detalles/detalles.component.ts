import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orden } from '../interfaces/orden.interface';
import { ListadoComponent } from '../listado/listado.component';
import { OrdenEstadoService } from '../service/orden-estado.service';
import { OrdenEstado } from '../interfaces/ordenEstado.interface';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenServicioService } from '../service/orden-servicio.service';
import { OrdenServicio } from '../interfaces/ordenServicio.interface';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styles: [`
  `
  ]
})
export class DetallesComponent implements OnInit {

  constructor(private madDialogRef : MatDialogRef<ListadoComponent>,
    private ordenEstado : OrdenEstadoService,
    private ordenServicio: OrdenServicioService,
    @Inject(MAT_DIALOG_DATA) public orden : Orden) { }

  ordenesEstado : OrdenEstado[] = [];
  ordenesServicio : OrdenServicio[] = [];

  detalleEstado = new MatTableDataSource();
  displayedColumns: string[] = ['fecha', 'hora', 'nombreEstado'];

  detalleServicio = new MatTableDataSource();
  displayedColumns2: string[] = ['nombreServicio','costo'];
  ngOnInit(): void { 
    this.ordenEstado.getOrdenEstadoByIdOrden(this.orden.idOrdenTrabajo)
     .subscribe(resp => {
      this.detalleEstado.data = resp;
      this.ordenesEstado = resp; 
    })

    this.ordenServicio.getServiciosOrden(this.orden.idOrdenTrabajo)
      .subscribe(resp => {
        this.detalleServicio.data = resp;
        this.ordenesServicio = resp
    })
  }

  getTotalCost() {
    return this.ordenesServicio.map(t => t.costo).reduce((acc, value) => acc + value, 0);
  }

  close(){
    this.madDialogRef.close();
  }
}
