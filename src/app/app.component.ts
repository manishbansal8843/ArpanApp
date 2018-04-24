import { Component,ViewChild,OnDestroy,OnInit,ElementRef,NgZone } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { Initiative } from 'app/value-objects/initiative';
import { Subscription } from 'rxjs/Subscription';
import { Components } from 'app/value-objects/component';
import { Subject } from 'rxjs/Subject';
import { FetchUserDetailsService } from 'app/fetch-user-details.service';
import { from } from 'rxjs/observable/from';
import { environment } from 'environments/environment';
import { User } from 'app/value-objects/user';
import { LocalStorageFetchService } from 'app/local-storage-fetch.service';
import { ComponentTree } from 'app/value-objects/component-tree';
declare const gapi:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  @ViewChild ('mySidenav') sideNav:ElementRef;
  @ViewChild ('appMain') appMain:ElementRef;

  private components:Components[]=[];
  private isLoggedIn:boolean=false;
  private initiativeSubscription:Subscription;
  private grants:Subject<string>;
  private roles:Subject<string>;
  private rolesSubscription:Subscription;
  private usersSubscription:Subscription;
  private grantsSubscription:Subscription;
  private loggedInEventSubscription:Subscription;
  private componentsSubscription:Subscription;
  private componentTrees:ComponentTree[]=[];
  private first_name:string;
  private allComponents:Components[]=[];
  ngOnDestroy(): void {
    if(this.initiativeSubscription)
    this.initiativeSubscription.unsubscribe();
    if(this.rolesSubscription)
    this.rolesSubscription.unsubscribe();
    if(this.usersSubscription)
    this.usersSubscription.unsubscribe();
    if(this.grantsSubscription)
    this.grantsSubscription.unsubscribe();
    if(this.loggedInEventSubscription)
    this.loggedInEventSubscription.unsubscribe();
    if(this.componentsSubscription)
    this.componentsSubscription.unsubscribe();
  }
  constructor(private fetchLocalStorage:LocalStorageFetchService,private authService:AuthService,private _fetchuserDetails:FetchUserDetailsService,private zone:NgZone){
  }
  ngOnInit(): void {
   this.initiativeSubscription= this.authService.fetchcurremtInitiative().subscribe(initiative=>{
     this.initiative=initiative[0];
    });
    this.componentsSubscription=this.fetchLocalStorage.fetch_components().subscribe(val=>{
      console.log('Got the componets in app aomp-----'+JSON.stringify(val));
      this.allComponents=val;
    });
   this.loggedInEventSubscription= this.authService.loggedInEvent.subscribe((user:User)=>{
      if(user){
        this.grants=new Subject<string>();
        this.roles=new Subject<string>();
       this.buildLHSMenu(user);
       this.zone.run(()=>{
         this.isLoggedIn=true;
         this.first_name=user.first_name;

        });
      }
      else{
        this.buildLHSMenu(null);
        this.zone.run(()=>{
        this.isLoggedIn=false;
      });
      }
    });
    
    
  }
  title = 'app';
  initiative:Initiative;
  
buildLHSMenu(user:User){
  if(user){
    this.grantsSubscription=this.roles.subscribe(role=>{
      console.log('got the role in app comp'+role);
      
     this._fetchuserDetails.getUserGrants(role).subscribe(role=>{
       from(role[0].grants).subscribe(val=>this.grants.next(val));
     });
      ;
    });
    console.log('got the user in app comp'+JSON.stringify(user));
      this.rolesSubscription= from(user.roles).subscribe(val=>{
        console.log('emiting role from from:'+val);
        this.roles.next(val);
      },error=>{},()=>{
        console.log('roles subscription complete');
        this.roles.complete();
      });
     
     this.grants.subscribe(
      (code: string) => {
      

        let comp=this.allComponents.find(comp=>comp.code==code);
        if(comp ){
          console.log('found the comp for code:'+code)

         let tree:ComponentTree= this.buildCompTree(new ComponentTree(comp,[]));
        this.mergeTrees(tree,this.componentTrees.find(cTree=>cTree.component.id==tree.component.id),this.componentTrees);
        this.authService.componentTrees.next(this.componentTrees);
      }

      }
     );
    }
    else{
      this.componentTrees=[];
      this.authService.componentTrees.next(this.componentTrees);
    }
}

buildCompTree(compTree:ComponentTree):ComponentTree{
if(compTree.component.parent==0){
  return compTree;
}
else{
  let parent=this.allComponents.find(component=>component.id==compTree.component.parent);
  let children:ComponentTree[]=[compTree];
  let localTree=new ComponentTree(parent,children);
  return this.buildCompTree(localTree);
}
}

mergeTrees(tree:ComponentTree,treeMain:ComponentTree,treeArray:ComponentTree[]){
if(!treeMain){
  treeArray.push(tree);
}
else{
  let childTreeToAdd=tree.children[0];
  if(childTreeToAdd){
  let existingChildTree=treeMain.children.find(cTree=>cTree.component.id==childTreeToAdd.component.id);
  if(!existingChildTree){
    treeMain.children.push(childTreeToAdd);
  }
  else{
  this.mergeTrees(childTreeToAdd,existingChildTree,treeMain.children);
  }
}
}

}

   openNav() {
     this.sideNav.nativeElement.style.width='250px';

    }

 closeNav() {
  this.sideNav.nativeElement.style.width='0';


}
 signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(()=> {
    console.log('User signed out.');
    this.authService.logout();
  });
}

}
