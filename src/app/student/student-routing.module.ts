import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDashboardComponent } from 'app/student/student-dashboard/student-dashboard.component';
import { StudentViewComponent } from 'app/student/student-view/student-view.component';
import { StudentUpdateComponent } from 'app/student/student-update/student-update.component';
import { AuthGaurdService } from 'app/auth-gaurd.service';

const routes: Routes = [
  {path:'',component:StudentDashboardComponent,canActivate:[AuthGaurdService],
children:[
  {path:'', canActivateChild: [AuthGaurdService],children:[
    {path:'view',component:StudentViewComponent},
    {path:'update',component:StudentUpdateComponent}
  ]}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
