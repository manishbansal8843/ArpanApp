import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
declare const FB:any;
@Component({
  selector: 'app-fb-sign-in-btn',
  templateUrl: './fb-sign-in-btn.component.html',
  styleUrls: ['./fb-sign-in-btn.component.css']
})
export class FbSignInBtnComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router,private zone:NgZone) { }

  ngOnInit() {

  }
 public checkLoginState() {
   console.log('checking login status');
    FB.getLoginStatus((response)=> {
      this.statusChangeCallback(response);
    });
  }
  public statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log('status was already connected. will test api.');
     this.testAPI();
    } else if(response.status ==='not_authorized'){
      console.log('status was not authorised. will call login');

      FB.login((response)=> {
        if (response.status === 'connected') {
          console.log('status is now connected. will test api.');

          this.testAPI();
        } else {
          console.log('fatal.');

          document.getElementById('fb-status-login').innerHTML = 'some serious shit happened'; 
        }
      });
      
    } else{
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('fb-status-login').innerHTML = 'Please log ' +
        'into this app.';
    }
  }
  public  testAPI() {

    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', response=> {
      console.log('Successful login for: ' + response.name);
     
        this.authService.login(response.name);

        this.zone.run(()=>{this.router.navigate(['/dashboard']);});

    });
    

  }
}
