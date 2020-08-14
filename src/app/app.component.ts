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
      url: '/inicio',
      icon: 'home'
    },
    {
      title: 'Ejercicios',
      url: '/ejercicios',
      icon: 'folder'
    },
    {
      title: 'Clases',
      url: '/clases',
      icon: 'time'
    },
    {
      title: 'Ejercicios',
      url: '/ejercicios',
      icon: 'document-text'
    },
    {
      title: 'Videos',
      url: '/videos',
      icon: 'videocam'
    },
    {
      title: 'Simulador',
      url: '/simulador-clases',
      icon: 'play'
    },
    {
      title: 'Perfil',
      url: '/perfil-usuario',
      icon: 'person'
    },
    
    {
      title: 'Institución',
      url: '/quienes-somos',
      icon: 'business'
    },
    {
      title: 'Contactenos',
      url: '/contactenos',
      icon: 'send'
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
    const path = window.location.pathname.split('app/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
