import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from '../service/inventario.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  myDate = new Date();

  constructor(private inventarioService : InventarioService) { }

  dataSource = new MatTableDataSource();
  displayedColumns :string[] = ['codigoProducto','nombreCategoria','nombreMarca','stock','costo','actions'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.inventarioService.getProductos()
    .subscribe(resp => this.dataSource.data = resp);
  }

}
