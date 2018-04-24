import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotfoundComponent } from 'app/page-notfound/page-notfound.component';

const routes:Routes=[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
 /*  {path:'volunteer',component:LoginComponent}, */
  {path:'student',loadChildren:'app/student/student.module#StudentModule'},
/*   {path:'attendance',component:LoginComponent},
 */  { path: '**', component: PageNotfoundComponent }
  
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
      {
        enableTracing: false, // <-- debugging purposes only
      })
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
