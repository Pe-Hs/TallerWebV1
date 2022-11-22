import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { ListadoComponent } from '../listado/listado.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  hide = true;
  
  constructor(private matDialogRef: MatDialogRef<ListadoComponent>,
    private snackBar: MatSnackBar,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.matDialogRef.updateSize('40%', 'auto')
  }

  usuario : User = {
    idUsuario: '',
    nombreUsuario: '',
    apellidoUsuario: '',
    dniUsuario: '',
    domicilio: '',
    email: '',
    telefono: '',
    password: '',
    idRol: undefined,
    idTaller: undefined,
    usuario: '',

  }

  usuarioForm = new FormGroup({
    nombreCliente: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    apellidoCliente: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]+$')]),
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]),
    domicilio: new FormControl('', [Validators.maxLength(200)]),
    usuario: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
    password: new FormControl('', [Validators.required]),
  })

  registrarUsuario(){
    const snackBar = new MatSnackBarConfig();
    snackBar.duration = 1 * 1000;
    
    if(this.usuarioForm.valid){
      this.userService.postUser(this.usuario)
        .subscribe(resp =>  resp)
      this.snackBar.open('Usuario Registrado ', 'Cerrar', snackBar);
    }else{
      this.snackBar.open('Complete los Campos ', 'Cerrar', snackBar);
    }
  }

  close(){
    this.matDialogRef.close();
  }
}
