import { Injectable,EventEmitter } from '@angular/core';
import { User } from 'app/value-objects/user';
import { HttpClient } from '@angular/common/http';
import {environment} from 'environments/environment';
import { Initiative } from 'app/value-objects/initiative';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { FetchUserDetailsService } from 'app/fetch-user-details.service';
import { Router } from '@angular/router';
import { ComponentTree } from 'app/value-objects/component-tree';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  componentTrees:BehaviorSubject<ComponentTree[]>=new BehaviorSubject([]);
  loggedInEvent:EventEmitter<User>=new EventEmitter();
// store the URL so we can redirect after logging in
redirectUrl: string;
private isLoggedIn:boolean=false;
private email:string;
private currentInitiative:Initiative;
private interval;
login(email:string){
  console.log('setting logged in');
  //Write code to call Server api for session creation
  this.email=email;
  this.isLoggedIn=true;
   this._fetchuserDetails.getUserDetails(this.email).subscribe(user=>{
    console.log('got the user in auth service'+JSON.stringify(user[0]));
    this.loggedInEvent.emit(user[0]);
     });
  
}
logout(){
  console.log('setting logged out');
  //Write code to call Server api for session deletion
  this.isLoggedIn=false;
  this.loggedInEvent.emit(null);
  this.router.navigate(['/home']);

  
}
getLoginStatus():boolean{
  return this.isLoggedIn;
}
  constructor(private _http:HttpClient,private _fetchuserDetails:FetchUserDetailsService,private router:Router) { 
   
   
  }

getCurrentInitiative():string{
  console.log('getting current initiative');
  if(this.currentInitiative){
    return this.currentInitiative.name;
  }
  
  
}

fetchcurremtInitiative():Observable<Initiative>{
  console.log('going to fire initiatives query 1');
  let url:string=`${environment.initiativeURL}/?active=true`;
 return this._http.get<Initiative>(url).pipe(
    tap(data=>{
    console.log('Got the initiative:'+JSON.stringify(data));
    
  }
));
}

getUserEmail():string{
    return this.email;
  
}

}
