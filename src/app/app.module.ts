import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GoogleSignInBtnComponent } from './login/google-sign-in-btn/google-sign-in-btn.component';
import { FbSignInBtnComponent } from './login/fb-sign-in-btn/fb-sign-in-btn.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService } from './auth-gaurd.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryMockDataService } from 'app/in-memory-mock-data.service';
import { environment } from 'environments/environment';
import { FetchUserDetailsService } from 'app/fetch-user-details.service';
import { LocalStorageFetchService } from './local-storage-fetch.service';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GoogleSignInBtnComponent,
    FbSignInBtnComponent,
    HomeComponent,
    LoginComponent,
    PageNotfoundComponent
      ],
  imports: [
    BrowserModule,
    HttpClientModule,
    environment.production ?
    [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryMockDataService),    
    AppRoutingModule
    
  ],
  providers: [AuthGaurdService,AuthService,FetchUserDetailsService,InMemoryMockDataService, LocalStorageFetchService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(router: Router) {
    if(!environment.production)
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
