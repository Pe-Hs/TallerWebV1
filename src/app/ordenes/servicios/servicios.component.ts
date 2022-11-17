import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { RegistroComponent } from '../registro/registro.component';
import { Servicio } from '../../servicios/interfaces/servicio.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styles: [
  ]
})
export class ServiciosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource = new MatTableDataSource<Servicio>();
  displayedColumns: string[] = ['actions', 'nombreServicio', 'costo']

  constructor(private dialogRef : MatDialogRef<RegistroComponent>,
              @Inject(MAT_DIALOG_DATA) public servicios : Servicio[]) { 
 }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  seleccionarSericio(servicio: Servicio){
    this.dialogRef.close(servicio)
    console.log(servicio)
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.servicios;
    this.dialogRef.updateSize('40%', 'auto');
  }

  close(){
    this.dialogRef.close('')
  }

}
