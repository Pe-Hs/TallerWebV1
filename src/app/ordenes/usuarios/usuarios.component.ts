import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistroComponent } from '../registro/registro.component';
import { User } from '../../user/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource = new MatTableDataSource<User>();
  displayedColumns : string[] = ['actions','dniUsuario','nombreUsuario','apellidoUsuario']

  constructor(private matDialogRef: MatDialogRef<RegistroComponent>,
              @Inject(MAT_DIALOG_DATA) public usuarios : User[]) { 

  }

  ngOnInit(): void {
    this.dataSource.data = this.usuarios;
    this.dataSource.paginator = this.paginator;
    this.matDialogRef.updateSize('40%', 'auto');
  }

  seleccionarUsuario(usuario : User){
    this.matDialogRef.close(usuario)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  close(){
    this.matDialogRef.close('');
  }

}
