import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentUpdateComponent } from './student-update/student-update.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule
  ],
  declarations: [StudentDashboardComponent, StudentViewComponent, StudentUpdateComponent]
})
export class StudentModule { }
