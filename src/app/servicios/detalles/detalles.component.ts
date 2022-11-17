import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servicio } from '../interfaces/servicio.interface';
import { ListadoComponent } from '../listado/listado.component';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styles: [
  ]
})
export class DetallesComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public servicio : Servicio,
               private dialogRef: MatDialogRef<ListadoComponent> ) { }

  ngOnInit(): void {
    console.log(this.servicio)
  }

  close(){
    this.dialogRef.close();
  }
}
