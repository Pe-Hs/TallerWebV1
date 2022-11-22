import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ListadoComponent } from '../listado/listado.component';
import { Cliente } from '../interfaces/cliente.interface';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {
  
  cliente : Cliente = {
    idCliente: '',
    nombreCliente: '',
    apellidoCliente: '',
    email: '',
    telefono: '',
    dniCliente: '',
  }

  clienteForm = new FormGroup({
    nombreCliente: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    apellidoCliente: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]+$')]),
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]),
  })

  isDisable = true;
  
  constructor(private matDialogRef: MatDialogRef<ListadoComponent>,
              private ClienteService: ClienteService,
              private snackBar : MatSnackBar,
              private router: Router) { }

  close(){
    this.matDialogRef.close();
  }

  guardar(){
    if(this.clienteForm.valid){

      this.ClienteService.postCliente(this.cliente)
      .subscribe(cliente => this.cliente = cliente)

    }else{

    }
    
  }

  ngOnInit(): void {
    this.matDialogRef.updateSize('40%', 'auto');
  }

}
