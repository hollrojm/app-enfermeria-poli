import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'paper-plane'
    },
    {
      title: 'Perfil',
      url: '/perfil-usuario',
      icon: 'person'
    },
    {
      title: 'Institucion',
      url: '/quienes-somos',
      icon: 'school'
    },
    {
      title: 'Ejercios',
      url: '/simulador-clases',
      icon: 'heart'
    },
    {
      title: 'Videos',
      url: '/videos',
      icon: 'warning'
    }
  ];
  public labels = ['Calendario', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
