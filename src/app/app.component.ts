import { Component, OnInit } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { HttpClient } from "@angular/common/http";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { InteractionRequiredAuthError, AuthError } from 'msal';

const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me/"; 
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  
})
export class AppComponent implements OnInit {
   profile; 
  darkMode: boolean = true;

  public selectedIndex = 1;
  public appPages = [
    {
      title: "Mi Perfil",
      url: "/perfil-usuario",
      icon: "person",
    },
    {
      title: "Inicio",
      url: "/inicio",
      icon: "home",
    },
    {
      title: "Clases",
      url: "/clases",
      icon: "time",
    },
    {
      title: "Ejercicios",
      url: "/ejercicios",
      icon: "document-text",
    },
    {
      title: "Videos",
      url: "/videos",
      icon: "videocam",
    },
    {
      title: "Simulador",
      url: "/simulador-clases",
      icon: "play",
    },
    {
      title: "Institución",
      url: "/quienes-somos",
      icon: "business",
    },
    {
      title: "Contactenos",
      url: "/contactenos",
      icon: "send",
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private broadcastService: BroadcastService,
    private authService: MsalService,
    public cerrar: Router,
    private http: HttpClient
  ) {
    this.initializeApp();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    this.darkMode = prefersDark.matches;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkDarkTheme();
    });
  }
  checkDarkTheme() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDark.matches) {
      document.body.classList.toggle("dark");
    }
  }
  cambio() {
    /* const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'); */
    this.darkMode = !this.darkMode;
    document.body.classList.toggle("dark");
  }

  ngOnInit() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
     this.getProfile(); 
  }
  logout() {
    this.authService.logout();
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


