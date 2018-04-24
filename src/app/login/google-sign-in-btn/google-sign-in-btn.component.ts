import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import {environment} from 'environments/environment';
import { AuthService } from 'app/auth.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

declare const gapi: any;

@Component({
  selector: 'app-google-sign-in-btn',
  templateUrl: './google-sign-in-btn.component.html',
  styleUrls: ['./google-sign-in-btn.component.css']
})
export class GoogleSignInBtnComponent implements OnInit,AfterViewInit {


  ngOnInit() {
  }


  private clientId:string = environment.google_client_id;

  private scope = [
    'profile',
    'email'
  ].join(' ');

  public auth2: any;
  public googleInit() {  
    
      console.log('gapi is defined');  
       gapi.load('auth2', () => {
     this.auth2= gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.auth2.then((googleauth)=>{console.log('auth2 initialized');
      console.log('got the auth2 object');
      
    },(err)=>console.log('Error in auth2 initialization'+err.details));
    this.attachSignin(document.getElementById('customBtn2'));
    });
  
  
  }
  
  public attachSignin(element) {
  
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.authService.login(profile.getEmail());
       this.zone.run(()=>{this.router.navigate([this.authService.redirectUrl?this.authService.redirectUrl:'/home']);});
        
      },  (error) =>{
        console.log(JSON.stringify(error, undefined, 2));
        this.authService.logout();
      });
  }

  constructor(private authService:AuthService,private router:Router,private zone:NgZone) {
  }

  ngAfterViewInit() {
    
    this.googleInit();
  }

}
