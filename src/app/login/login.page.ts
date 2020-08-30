import { Component, OnInit } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { InteractionRequiredAuthError, AuthError } from 'msal';
const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me/"; 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  profile;
  constructor(
    private authService: MsalService,
    public cambio: Router,
    public http: HttpClient,
    public menuCtrl: MenuController


  ) { }

  ngOnInit() {
    this.getProfile();
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

