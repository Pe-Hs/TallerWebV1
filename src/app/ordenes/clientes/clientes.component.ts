import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/cliente/interfaces/cliente.interface';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {
  
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  constructor(private dialogRef : MatDialogRef<RegistroComponent>,
             @Inject(MAT_DIALOG_DATA) public clientes : Cliente[]) { }

  dataSource = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['actions','dniCliente','nombreCliente','apellidoCliente'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  seleccionarCliente(cliente : Cliente){
    this.dialogRef.close(cliente)
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.clientes
    this.dialogRef.updateSize('50%', 'auto');
  }

  close(){
    this.dialogRef.close({data: '--'});
  }
}
