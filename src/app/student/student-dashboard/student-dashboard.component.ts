import { Component, OnInit } from '@angular/core';
import { ParamMap,ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { ComponentTree } from 'app/value-objects/component-tree';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { ViewChild,ElementRef } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  @ViewChild ('myTopnav') topNav:ElementRef;

  constructor(private route:ActivatedRoute,private authService:AuthService,private zone:NgZone) { }
  private componentTrees:ComponentTree[]=[];
  ngOnInit() {
    
    this.authService.componentTrees.subscribe(val=>{
      this.route.pathFromRoot.forEach(route=>console.log('path from route in dashboard:'+route.snapshot.url.toString()));
    this.route.pathFromRoot.filter(route=>route.snapshot.url.toString()!='').forEach(route=>{
      if(val){
      let temp:ComponentTree=val.find(tree=>tree.component.route.endsWith(route.snapshot.url.toString()));
        if(temp)
        val=temp.children;
      }
    });
    this.zone.run(()=>this.componentTrees=val);
    });
   
  }
  toggleNav(){
    console.log('topnav class'+this.topNav.nativeElement.className);
    if (this.topNav.nativeElement.className === "dash-topnav") {
      this.topNav.nativeElement.className += " responsive";
    } else {
      this.topNav.nativeElement.className = "dash-topnav";
    }
  }
}
