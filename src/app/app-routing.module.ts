import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: 'taller',
    loadChildren: () => import('./taller/taller.module').then(m => m.TallerModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule),
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClienteModule),
  },
  {
    path: 'servicio',
    loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosModule),
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./vehiculo/vehiculo.module').then(m => m.VehiculoModule)
  },
  {
    path: 'ordenTrabajo',
    loadChildren: () => import('./ordenes/ordenes.module').then( m => m.OrdenesModule),
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
