import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Components } from 'app/value-objects/component';
import { environment } from 'environments/environment';
import { from } from 'rxjs/observable/from';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { tap } from 'rxjs/operators/tap';


@Injectable()
export class LocalStorageFetchService {
  private components:Components[];
  private appLS={};
  private promises={};
  constructor(private http:HttpClient) { }

  fetch_components():Observable<Components[]>{
    return fromPromise(this.cachedHttpPromise<Components[]>(environment.componentDetailsURL));
  }

  cachedHttpPromise<T>(url:string):Promise<any>{
    let promise=this.promises[url];
    if(!promise){
      this.promises[url]=new Promise((resolve,reject)=>{
        let value:string=this.getDatafromLS(url);
        if(value){
          console.log('---got the data from LS--:'+JSON.stringify(value));
          resolve(value);
          return;
        }
        this.http.get<T>(url).pipe(
          tap(value=>{
            console.log('Fetched components--'+JSON.stringify(value));
          })
        ).subscribe(value=>{
          let val=JSON.stringify(value);
          if(localStorage){
            localStorage.setItem(url,val);
          }
          else{
            this.appLS[url]=val;
          }
          resolve(val);
        },error=>{
          reject(error);
        });
      });
      return this.promises[url];
    }
    else
    return promise;

  }

  getDatafromLS(url:string):string{
    if(localStorage){
      let value=localStorage.getItem(url);
      
        return value? JSON.parse(value) :value;
      
    }
    else{
      return this.appLS[url];
    }
  }

}
