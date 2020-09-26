import { Component, OnInit } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { InteractionRequiredAuthError, AuthError } from 'msal';
import { DomSanitizer } from '@angular/platform-browser';
import "@microsoft/mgt/dist/es6/components/mgt-person/mgt-person";
import * as firebase from 'firebase';
import { LoginPage } from './login/login.page';
import { AngularFireAuth } from '@angular/fire/auth';

const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me/"; 
 const graphEndpoint = "https://graph.microsoft.com/v1.0/me/photo/$value"; 

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  profile;
  profileImg;
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
      title: "Administrador",
      url: "/administrador",
      icon: "person",
    },
    {
      title: "Contactenos",
      url: "/contactenos",
      icon: "send",
    },
  ];
  props: any;
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private broadcastService: BroadcastService,
    private authService: MsalService,
    public cerrar: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public router: Router,
    private afAuth: AngularFireAuth
    
  ) {
    this.initializeApp();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    this.darkMode = prefersDark.matches;
  }
  transform(html) {
    return this.sanitizer.bypassSecurityTrustUrl(html);
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
  /*   this.getProfile(); 
    this.getProfileImg();  */
  }

  logout() {
    console.log('salir');
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
      
    }

  }
  
 /*  getProfile() {
    this.http.get(graphMeEndpoint).subscribe({
      next: (profile) => {
        this.profile = profile;
      },
      error: (err: AuthError) => {
        // Si hay un error de interacción requerida,
        // llamar a uno de los métodos interactivos y luego realizar la solicitud nuevamente.
        if (
          InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)
        ) {
          this.authService
            .acquireTokenPopup({
              scopes: this.authService.getScopesForEndpoint(graphMeEndpoint),
            })
            .then(() => {
              this.http
                .get(graphMeEndpoint)
                .toPromise()
                .then((profile) => {
                  this.profile = profile;
                });
            });
        }
      },
    });
  }
  getProfileImg() {
    this.http
      .get(graphEndpoint, {
        headers: { "Content-Type": "image/*" },
        responseType: "arraybuffer",
      })
      .toPromise()
      .then(
        (data) => {
          const TYPED_ARRAY = new Uint8Array(data);
          // convierte la matriz escrita en una cadena de caracteres
          const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

          //convierte una cadena de caracteres a base64 String
          let base64String = btoa(STRING_CHAR);

          //desinfectar la URL que se pasa como un valor a la imagen src atributo

          this.profileImg = this.sanitizer.bypassSecurityTrustUrl(
            "data:image/*;base64, " + base64String
          );

          console.log(this.profileImg);
        },
        (err) => {
          this.profileImg = "../assets/images/avatar-enfermeria.JPG";
        }
      );
  }
  loginMs = () =>{
    var provider = new firebase.auth.OAuthProvider('microsoft.com');
    console.log(provider)
    provider.addScope('User.mail');
    firebase.auth().signInWithRedirect(provider).then(
      function(result) {
        console.log('result', result)
        var token = result.credential.accessToken;
        var user = result.user;
        var isNewUser = result.additionalUserInfo.isNewUser;
         
      }.bind(this) 
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

  } */

  
  
    

