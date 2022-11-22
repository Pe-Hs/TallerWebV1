import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cliente } from 'src/app/cliente/interfaces/cliente.interface';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Vehiculo } from '../../vehiculo/interface/vehiculo.interface';
import { ClienteService } from '../../cliente/services/cliente.service';
import { VehiculoService } from '../../vehiculo/service/vehiculo.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Motivo } from '../interface/motivo.interface';
import { MotivoService } from '../service/motivo.service';
import { Orden } from 'src/app/ordenes/interfaces/orden.interface';
import { OrdenesService } from '../../ordenes/service/ordenes.service';
import { DatePipe, formatDate } from '@angular/common';
import { UserService } from '../../user/services/user.service';
import { User } from 'src/app/user/interfaces/user.interface';
import { UsuariosComponent } from 'src/app/ordenes/usuarios/usuarios.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styles: [
  ],
  providers: [
  ],
})

export class StepperComponent implements OnInit {

  fechaHoy = new Date();

  constructor(
    private clienteService: ClienteService,
    private vehiculoService: VehiculoService,
    private userSerive: UserService,
    private motivoService: MotivoService,
    private oredenesService: OrdenesService,
    private snackBar: MatSnackBar,
    private matDialog : MatDialog,
    private matDialogRef: MatDialogRef<DashboardComponent>) { }

  ngOnInit(): void {
    
    this.userSerive.getUser()
      .subscribe(resp => this.usuarios = resp)
  }

  usuarios : User[] = [];
  
  cliente: Cliente = {
    idCliente: '',
    nombreCliente: '',
    apellidoCliente: '',
    email: '',
    telefono: '',
    dniCliente: '',
  }

  vehiculo: Vehiculo = {
    placa: '',
    marca: '',
    modelo: '',
    nroChasis: '',
    idCliente: '',
    idVehiculo: '',
    color: '',
  }

  motivo : Motivo = {
    descripcion: '',
    idVehiculo: '',
    fecha: '',
    idMotivo: '',
  }

  orden :  Orden = {
    idCliente: '',
    idOrdenTrabajo: '',
    idTaller: 2,
    idUsuario: '',
    idVehiculo: '',
    motivo: '',
    fecha: '',
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
  
  firstFormGroup = new FormGroup({
    nombreCliente: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    apellidoCliente: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]+$')]),
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]),
  })

  secondFormGroup = new FormGroup({
    placa: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{3}[0-9]{3}$')]),
    color: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    nroChasis: new FormControl('', Validators.maxLength(17) ),
    marca: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    modelo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
  });

  thirdFormGroup = new FormGroup({
    motivo: new FormControl('', [Validators.required, Validators.maxLength(500)])
  })

  forthFormGroup = new FormGroup({
    test: new FormControl('', [Validators.required, Validators.maxLength(500)])
  })

  fifthFormGroup = new FormGroup({
    nombreUsuario: new FormControl({value:'', disabled: true}, [Validators.pattern('^[a-zA-Z ]*$')]),
    apellidoUsuario: new FormControl({value:'', disabled: true}, [Validators.pattern('^[a-zA-Z ]*$')]),
    dni: new FormControl({value:'', disabled: true}, [Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])
  })

  isEditable = false;
  isDisable = true;
  isDisable2 = true;
  isDisable3 = true;
  isDisable4 = true;

  buscarCliente() {

    const snackBar = new MatSnackBarConfig();
    snackBar.duration = 1 * 1000;


    if (this.firstFormGroup.valid) {

      this.clienteService.findClienteId(this.cliente.nombreCliente,
        this.cliente.apellidoCliente,
        this.cliente.telefono,
        this.cliente.dniCliente)
        .subscribe((resp) => {
          this.cliente = resp[0]
          this.snackBar.open('Cliente ID ' + this.cliente.idCliente, 'Cerrar', snackBar);
        });
    } else {
      this.snackBar.open('Complete los Campos Requeridos', 'Cerrar', snackBar)
    }

  }

  registrarCliente() {

    const snackBarCon = new MatSnackBarConfig();
    snackBarCon.duration = 1 * 1000;

    if (this.firstFormGroup.valid) {

      this.clienteService.postCliente(this.cliente)
       .subscribe((resp) => resp);

      this.snackBar.open('Cliente Registrado', 'Cerrar', snackBarCon);
      this.isDisable = false;

    } else {
      this.snackBar.open('Complete los Campos Requeridos', 'Cerrar', snackBarCon)
    }
  }

  buscarVehiculo(){
    const snackBar = new MatSnackBarConfig();
    snackBar.duration = 1 * 1000;

    if(this.secondFormGroup.valid){
      this.vehiculoService.findVehiculoId(this.vehiculo.placa,
        this.vehiculo.marca,
        this.vehiculo.modelo)
          .subscribe((resp) => {
            this.vehiculo = resp[0]
            this.snackBar.open('Vehiculo ID ' + this.vehiculo.idVehiculo, 'Cerrar', snackBar);
          })
    }else{
      this.snackBar.open('Complete los Campos Requeridos', 'Cerrar', snackBar)
    }
  }

  registrarVehiculo(){

    const snackBarCon = new MatSnackBarConfig();
    snackBarCon.duration = 1 * 1000;

    if(this.secondFormGroup.valid){      
      this.vehiculo.idCliente = this.cliente.idCliente

      this.vehiculoService.postVehiulo(this.vehiculo)
        .subscribe( (resp) =>  resp);
     
      this.snackBar.open('Vehiculo Registrado', 'Cerrar', snackBarCon);

      this.isDisable2 = false

    }else{
      this.snackBar.open('Complete los Campos Requeridos', 'Cerrar', snackBarCon)
    }

  }

  registrarMotivo(){
    
    const snackBarCon = new MatSnackBarConfig();
    snackBarCon.duration = 1 * 1000;

    if(this.thirdFormGroup.valid){

      this.motivo.idVehiculo = this.vehiculo.idVehiculo;
      this.motivo.fecha = this.fechaHoy.toISOString();
      
      this.motivoService.postMotivo(this.motivo)
        .subscribe((resp) =>   resp);   

        this.snackBar.open('Motivo Registrado', 'Cerrar', snackBarCon);

        this.isDisable3 = false;

    }else{
      this.snackBar.open('Complete los Campos Requeridos', 'Cerrar', snackBarCon)
    }
    
  }

  buscarUsuario(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus= true;
    dialogConfig.disableClose = true;
    dialogConfig.data = this.usuarios;

    this.matDialog.open(UsuariosComponent, dialogConfig)
      .afterClosed().subscribe(usuario => this.usuario = usuario)

    this.isDisable4 = false;

    dialogConfig.position = {
      'top': '0',
      'left': '0',
    }
  }

  registrarOrden(){
    this.orden.idCliente = this.cliente.idCliente;
      this.orden.idVehiculo = this.vehiculo.idVehiculo;
      this.orden.idTaller = 2;
      this.orden.idUsuario = this.usuario.idUsuario;
      this.orden.motivo = this.motivo.descripcion;
      this.orden.fecha = this.fechaHoy.toISOString();

      this.oredenesService.postOrden(this.orden)
        .subscribe((resp) => resp)
  }

  close() {

    this.matDialogRef.close('');
    
  }

}

