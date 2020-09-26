import { InicioPage } from './../inicio/inicio.page';
import { Component, OnInit } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { InteractionRequiredAuthError, AuthError } from 'msal';
import { AuthService } from '../service/auth.service';
import * as firebase from 'firebase';
const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me/"; 
/* const provider = new firebase.auth.OAuthProvider('microsoft.com'); */


/* provider.setCustomParameters({
  clientId: "8968f6eb-8ef4-4ab8-8777-8a1645ddc530", // This is your client ID
  authority: "https://login.microsoftonline.com/organizations",  // This is your tenant ID
  redirectUri: "https://simulador-enfermeria-poli.firebaseapp.com/__/auth/handler", // This is your redirect URI
  postLogoutRedirectUri: "https://simulador-enfermeria-poli.firebaseapp.com/__/auth/handler",
}); */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  profile;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private authService: MsalService,
    public cambio: Router,
    public http: HttpClient,
    public menuCtrl: MenuController,

  ) { }

  ngOnInit() {
    this.getProfile();
  }
  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
        console.log('User->', user);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['inicio']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginRedirect({
        extraScopesToConsent: ["user.read", "openid", "profile"]
      });
      this.cambio.navigate(['/inicio']); 
    } 
    
    else {
      this.authService.loginPopup({
        extraScopesToConsent: ["user.read", "openid", "profile"]
      });

      this.cambio.navigate(['/inicio']); 

    }
  }
  

  loginMs = () =>{
    console.log(provider)
      var provider = new firebase.auth.OAuthProvider('microsoft.com');
      /* this.cambio.navigate(['/inicio']); */
      provider.addScope('mail.read');
      
      firebase.auth().signInWithRedirect(provider)
      firebase.auth().getRedirectResult()
      .then( 
        function(result) {
          
           console.log(result)
             
          
          
        } ,error=>{console.log(error);
        }
        
      )
    
   
   .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  }); 
 

  }; 



  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }
  getProfile() {
    this.http.get(graphMeEndpoint)
      .subscribe({
        next: (profile) => {
          this.profile = profile;
        },
        error: (err: AuthError) => {
          // If there is an interaction required error,
          // call one of the interactive methods and then make the request again.
          if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
            this.authService.acquireTokenPopup({
              scopes: this.authService.getScopesForEndpoint(graphMeEndpoint)
            })
              .then(() => {
                this.http.get(graphMeEndpoint)
                  .toPromise()
                  .then(profile => {
                    this.profile = profile;
                  });
              });
          }
        }
      });
  }  
}

