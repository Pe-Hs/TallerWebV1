import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ListadoComponent } from '../listado/listado.component';
import { Servicio } from '../interfaces/servicio.interface';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [`
  input.costo-input::-webkit-outer-spin-button,
  input.costo-input::-webkit-inner-spin-button {
    display: none;
    }
  `
  ]
})
export class RegistroComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ListadoComponent>,
    private servicioService : ServiceService ) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('40%', 'auto')
  }
  
  servicio : Servicio = {
    nombreServicio: '',
    costo: undefined,
    descripcion: '',
  }

  servicioForm = new FormGroup({
    nombreServicio: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    costo: new FormControl('', [Validators.required, Validators.pattern('^-?(?:(?:0|[1-9][0-9]*)(?:.[0-9]{1,2})?|.[0-9]{1,2})$')]),
    descripcion: new FormControl('', [Validators.required]),   
  })

  guardar(){

  }

  close(){
    this.dialogRef.close();
  }
}
