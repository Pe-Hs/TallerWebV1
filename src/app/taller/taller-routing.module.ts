import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard'
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
    RouterModule
  ]
})
export class TallerRoutingModule { }
