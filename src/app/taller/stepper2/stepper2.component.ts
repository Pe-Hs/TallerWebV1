import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/cliente/interfaces/cliente.interface';
import { Orden } from 'src/app/ordenes/interfaces/orden.interface';
import { Vehiculo } from 'src/app/vehiculo/interface/vehiculo.interface';
import { Motivo } from '../interface/motivo.interface';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ClientesComponent } from 'src/app/ordenes/clientes/clientes.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { VehiculoService } from '../../vehiculo/service/vehiculo.service';
import { MotivoService } from '../service/motivo.service';
import { OrdenesService } from '../../ordenes/service/ordenes.service';
import { UserService } from '../../user/services/user.service';
import { User } from 'src/app/user/interfaces/user.interface';
import { UsuariosComponent } from 'src/app/ordenes/usuarios/usuarios.component';

@Component({
  selector: 'app-stepper2',
  templateUrl: './stepper2.component.html',
  styles: [
  ]
})
export class Stepper2Component implements OnInit {

  fechaHoy = new Date();

  constructor(private clienteService: ClienteService,
    private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private motivoService : MotivoService,
    private ordenesService : OrdenesService,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<DashboardComponent>) { }

  clientes  : Cliente [] = [];
  usuarios : User[] = [];

  cliente: Cliente = {
    idCliente: '',
    nombreCliente: '',
    apellidoCliente: '',
    email: '',
    telefono: '',
    dni: '',
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
  }

  usuario : User = {
    idUsuario: '',
    nombreUsuario: '',
    apellidoUsuario: '',
    dni: '',
    domicilio: '',
    email: '',
    telefono: '',
    password: '',
    idRol: undefined,
    idTaller: undefined,
    usuario: '',

  }

  firstFormGroup = new FormGroup({
    nombreCliente: new FormControl({value: '', disabled: true}, [Validators.pattern('^[a-zA-Z ]*$')]),
    apellidoCliente: new FormControl({value: '', disabled: true}, [Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl({value: '', disabled: true}, [Validators.email]),
    telefono: new FormControl({value: '', disabled: true}, [ Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]+$')]),
    dni: new FormControl({value: '', disabled: true}, [Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]),
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

  buscarClientes(){
    
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = this.clientes;

    this.dialog.open(ClientesComponent, dialogConfig)
      .afterClosed().subscribe(cliente => this.cliente = cliente);

    this.isDisable = false

    dialogConfig.position = {
      'top': '0',
      'left': '0',
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

  registrarOrden(){
    this.orden.idCliente = this.cliente.idCliente;
    this.orden.idVehiculo = this.vehiculo.idVehiculo;
    this.orden.idTaller = 2;
    this.orden.idUsuario = this.usuario.idUsuario;

    this.ordenesService.postOrden(this.orden)
      .subscribe((resp) => resp)
  }

  buscarUsuario(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus= true;
    dialogConfig.disableClose = true;
    dialogConfig.data = this.usuarios;

    this.dialog.open(UsuariosComponent, dialogConfig)
      .afterClosed().subscribe(usuario => this.usuario = usuario)

    this.isDisable4 = false;
    
    dialogConfig.position = {
      'top': '0',
      'left': '0',
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

      this.orden.idCliente = this.cliente.idCliente;
      this.orden.idVehiculo = this.vehiculo.idVehiculo;
      this.orden.idTaller = 2;
      this.orden.idUsuario = undefined;

      this.ordenesService.postOrden(this.orden)
        .subscribe((resp) => resp)

        this.snackBar.open('Motivo Registrado', 'Cerrar', snackBarCon);

        this.isDisable3 = false;

    }else{
      this.snackBar.open('Complete los Campos Requeridos', 'Cerrar', snackBarCon)
    }
    
  }
  
  ngOnInit(): void {
    this.clienteService.getCliente()
    .subscribe(resp => this.clientes = resp);
    this.userService.getUser()
    .subscribe(resp => this.usuarios = resp);
  }

  close(){
    this.matDialogRef.close()
  }
}
