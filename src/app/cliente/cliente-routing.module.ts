import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { RegistroComponent } from './registro/registro.component';

const routes:  Routes = [
  {
    path: '',
    children: [
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class ClienteRoutingModule { }
