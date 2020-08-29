import { Component, OnInit } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: MsalService,
    public cambio: Router,
    public menuCtrl: MenuController

  ) { }
  

  ngOnInit() {
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
}

