import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../interfaces/user.interface';
import { RegistroComponent } from '../registro/registro.component';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    table {
      width: 100%;
    }
  `
  ],
})
export class ListadoComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource = new MatTableDataSource<User>();

  displayedColumns: string[] = ['nombreUsuario', 'apellidoUsuario', 'dni', 'email', 'actions'];

  myDate = new Date();

  constructor(private UserService: UserService,
    private dialog: MatDialog) { 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  registrarUsuario(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    this.dialog.open(RegistroComponent, dialogConfig);

    dialogConfig.position = {
      'top': '0',
      'left': '0'
    }
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.UserService.getUser()
      .subscribe(users => this.dataSource.data = users);
    
  }

}