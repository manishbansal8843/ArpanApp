import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/value-objects/user';
import { Components } from 'app/value-objects/component';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { Role } from 'app/value-objects/role';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
@Injectable()
export class FetchUserDetailsService {
  user:User;
  constructor(private _http:HttpClient) { }
  getUserDetails(email:string):Observable<User[]>{
    
    let url:string=`${environment.userDetailsURL}/?email=${encodeURIComponent(email)}`;
    console.log('going to fetch user url'+url);

   return this._http.get<User[]>(url).pipe(
     tap(user => console.log('got the user:'+JSON.stringify(user))),
   catchError(this.handleError<User[]>('getUserDetails', []))
  );
  }

  getUserComponents(grant:string):Observable<Components[]>{
    let url:string=`${environment.userComponentsURL}/?code=${grant}`;
console.log('will fetch components for url:'+url);
    return this._http.get<Components[]>(url).pipe(
      tap(component => console.log('got the component:'+JSON.stringify(component))),
    catchError(this.handleError<Components[]>('getUserComponents', []))
   );
  }

  getUserGrants(role_name:string):Observable<Role[]>{
    let url:string=`${environment.userRolesURL}/?role_name=${role_name}`;
    return this._http.get<Role[]>(url).pipe(
      tap(role => console.log('got the roles:'+JSON.stringify(role))),
    catchError(this.handleError<Role[]>('getUserGrants', []))
   );
  }
  private handleError<T> (operation:string, result: T) {
    return (error: any):Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      let err:string=`Error occured during operation:${operation}. Error is ${JSON.stringify(error)}`;
      console.error(err);         
      return of( result);
    };
}
}
