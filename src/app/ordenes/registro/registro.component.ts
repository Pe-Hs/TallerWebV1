import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Cliente } from 'src/app/cliente/interfaces/cliente.interface';
import { Servicio } from '../../servicios/interfaces/servicio.interface';
import { User } from 'src/app/user/interfaces/user.interface';
import { Vehiculo } from '../../vehiculo/interface/vehiculo.interface';

import { ClienteService } from '../../cliente/services/cliente.service';
import { ServiceService } from '../../servicios/services/service.service';
import { UserService } from '../../user/services/user.service';
import { VehiculoService } from '../../vehiculo/service/vehiculo.service';

import { ClientesComponent } from '../clientes/clientes.component';
import { ServiciosComponent } from '../servicios/servicios.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { VehiculosComponent } from '../vehiculos/vehiculos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Motivo } from 'src/app/taller/interface/motivo.interface';
import { Orden } from '../interfaces/orden.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})

export class RegistroComponent implements OnInit {

  constructor(private clienteService: ClienteService,
              private vehiculoService: VehiculoService,
              private serviceService : ServiceService,
              private userService: UserService,
              private dialog: MatDialog,
              ) { }

  
  fechaHoy = new Date();

  clientes  : Cliente [] = [];
  servicios : Servicio[] = [];
  vehiculos : Vehiculo[] = [];
  usuarios  : User[]     = [];

  vehiculo: Vehiculo = {
    idVehiculo: '',
    marca:'',
    modelo:'',
    nroChasis:'',
    placa:'',
    idCliente:'',
    color:'',
  }

  cliente : Cliente = {
    nombreCliente : '',
    apellidoCliente: '',
    dniCliente: '',
    email: '',
    telefono: '',
    idCliente: '',
  }

  servicio : Servicio = {
    idServicio: 0,
    nombreServicio: '',
    descripcion: '',
    costo: 0,

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

  isEditable = false;
  isDisable = true;
  isDisable2 = true;
  isDisable3 = true;

  buscarClientes(){
    this.isDisable = false
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = this.clientes;

    this.dialog.open(ClientesComponent, dialogConfig)
      .afterClosed().subscribe(cliente => this.cliente = cliente)

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

    dialogConfig.position = {
      'top': '0',
      'left': '0',
    }
  }

  buscarServiciosCliente(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus= true;
    dialogConfig.disableClose = true;
    dialogConfig.data = this.servicios;

    this.dialog.open(ServiciosComponent, dialogConfig)
      .afterClosed().subscribe(servicio => this.servicio = servicio)

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

    dialogConfig.position = {
      'top': '0',
      'left': '0',
    }
  }
  
  ngOnInit(): void {
    this.clienteService.getCliente()
    .subscribe(resp => this.clientes = resp);

    this.serviceService.getServicios()
      .subscribe(resp => this.servicios = resp);

    this.userService.getUser()
      .subscribe(resp => this.usuarios = resp);
  }


}
