import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/cliente/interfaces/cliente.interface';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ClientesComponent } from 'src/app/ordenes/clientes/clientes.component';
import { Orden } from 'src/app/ordenes/interfaces/orden.interface';
import { OrdenesService } from 'src/app/ordenes/service/ordenes.service';
import { UsuariosComponent } from 'src/app/ordenes/usuarios/usuarios.component';
import { VehiculosComponent } from 'src/app/ordenes/vehiculos/vehiculos.component';
import { User } from 'src/app/user/interfaces/user.interface';
import { Vehiculo } from 'src/app/vehiculo/interface/vehiculo.interface';
import { VehiculoService } from 'src/app/vehiculo/service/vehiculo.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Motivo } from '../interface/motivo.interface';
import { MotivoService } from '../service/motivo.service';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-stepper3',
  templateUrl: './stepper3.component.html',
  styles: [
  ]
})
export class Stepper3Component implements OnInit {

  fechaHoy = new Date();

  constructor(private matDialogRef: MatDialogRef<DashboardComponent>,
    private dialog : MatDialog,
    private snackBar: MatSnackBar,
    private ordenesService : OrdenesService,
    private motivoService : MotivoService,
    private clienteService: ClienteService,
    private userService: UserService,
    private vehiculoService: VehiculoService,
    ) { }

  ngOnInit(): void {
    this.clienteService.getCliente()
    .subscribe(resp => this.clientes = resp);
    this.vehiculoService.getVehiculos()
    .subscribe(resp => this.vehiculos = resp);
    this.userService.getUser()
    .subscribe(resp => this.usuarios = resp);
  }

  clientes  : Cliente [] = [];
  vehiculos : Vehiculo[] = [];
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
    fecha: ''
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

  isEditable = false;
  isDisable = true;
  isDisable2 = true;
  isDisable3 = true;
  isDisable4 = true;

  firstFormGroup = new FormGroup({
    nombreCliente: new FormControl({value: '', disabled: true}, [Validators.pattern('^[a-zA-Z ]*$')]),
    apellidoCliente: new FormControl({value: '', disabled: true}, [Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl({value: '', disabled: true}, [Validators.email]),
    telefono: new FormControl({value: '', disabled: true}, [ Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]+$')]),
    dni: new FormControl({value: '', disabled: true}, [Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]),
  })

  secondFormGroup = new FormGroup({
    placa: new FormControl({value:'', disabled: true}, [ Validators.pattern('^[a-zA-Z]{3}[0-9]{3}$')]),
    color: new FormControl({value:'', disabled: true}, [ Validators.pattern('^[a-zA-Z ]*$')]),
    nroChasis: new FormControl({value:'', disabled: true}, Validators.maxLength(17) ),
    marca: new FormControl({value:'', disabled: true}, [ Validators.pattern('^[a-zA-Z ]*$')]),
    modelo: new FormControl({value:'', disabled: true}, [ Validators.pattern('^[a-zA-Z ]*$')]),
  });

  thirdFormGroup = new FormGroup({
    motivo: new FormControl('', [Validators.required, Validators.maxLength(500)])
  })

  fifthFormGroup = new FormGroup({
    nombreUsuario: new FormControl({value:'', disabled: true}, [Validators.pattern('^[a-zA-Z ]*$')]),
    apellidoUsuario: new FormControl({value:'', disabled: true}, [Validators.pattern('^[a-zA-Z ]*$')]),
    dni: new FormControl({value:'', disabled: true}, [Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])
  })

  forthFormGroup = new FormGroup({
    test: new FormControl('', [Validators.required, Validators.maxLength(500)])
  })

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

  buscarVehiculosCliente(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = this.cliente.idCliente;

    this.dialog.open(VehiculosComponent, dialogConfig)
      .afterClosed().subscribe(vehiculo => this.vehiculo = vehiculo)

    this.isDisable2 = false

    dialogConfig.position = {
      'top': '0',
      'left': '0',
    }
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

        this.snackBar.open('Motivo Registrado', 'Cerrar', snackBarCon);

        this.isDisable3 = false;

    }else{
      this.snackBar.open('Complete los Campos Requeridos', 'Cerrar', snackBarCon)
    }
    
  }

  registrarOrden(){
    
    this.orden.idCliente = this.cliente.idCliente;
    this.orden.idVehiculo = this.vehiculo.idVehiculo;
    this.orden.idTaller = 2;
    this.orden.idUsuario = this.usuario.idUsuario;
    this.orden.motivo = this.motivo.descripcion;
    this.orden.fecha = this.fechaHoy.toISOString();

    this.ordenesService.postOrden(this.orden)
      .subscribe((resp) => resp)
  }
  
  close(){
    this.matDialogRef.close();
  }
}
