import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetallesComponent } from '../detalles/detalles.component';
import { Cliente } from '../interfaces/cliente.interface';
import { RegistroComponent } from '../registro/registro.component';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [``],
})
export class ListadoComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource = new MatTableDataSource<Cliente>();

  myDate = new Date();

  displayedColumns: string[] = ['nombreCliente','apellidoCliente', 'telefono', 'email', 'actions'];

  constructor(private ClienteService : ClienteService,
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
  
  getDetallesCliente(cliente: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = cliente;

    this.dialog.open(DetallesComponent, dialogConfig)

    dialogConfig.position = {
      top: '0',
      left : '0'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.ClienteService.getCliente()
      .subscribe(clientes => this.dataSource.data = clientes )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
