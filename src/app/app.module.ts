
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import {auth}from 'firebase';

firebase.initializeApp (environment.firebaseConfig);
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    YouTubePlayerModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MsalModule.forRoot(
      {
        auth: {
          clientId: "8968f6eb-8ef4-4ab8-8777-8a1645ddc530", // This is your client ID
          authority: "https://login.microsoftonline.com/organizations", // This is your tenant ID
          redirectUri: "msauth://io.ionic.starter/fdvh5AOHK1EKm1NdxoI8SawEEC0%3D", // This is your redirect URI
          postLogoutRedirectUri: "http://www.google.com",
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      },
      {
        popUp: !isIE,
        consentScopes: ["user.read", "openid", "profile"],
        unprotectedResources: [],
        protectedResourceMap: [
          ["https://graph.microsoft.com/v1.0/me", ["user.read"]],
        ],
        extraQueryParameters: {},
      }
    ),
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    /* { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },  */
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
