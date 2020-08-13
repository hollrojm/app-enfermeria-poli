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
      title: 'Clases',
      url: '/clases',
      icon: 'paper-plane'
    },
    {
      title: 'Videos',
      url: '/videos',
      icon: 'heart'
    },
    {
      title: 'Simulador',
      url: '/simulador-clases',
      icon: 'archive'
    },
    {
      title: 'Perfil',
      url: '/perfil-usuario',
      icon: 'trash'
    },
    {
      title: 'Crear Cuenta',
      url: '/crear-cuenta',
      icon: 'warning'
    },
    {
      title: 'Quienes Somos',
      url: '/quienes-somos',
      icon: 'warning'
    },
    {
      title: 'Contactenos',
      url: '/contactenos',
      icon: 'warning'
    },
    {
      title: 'Cerrar Sesion',
      url: '/contactenos',
      icon: 'warning'
    }
  ];
  

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
