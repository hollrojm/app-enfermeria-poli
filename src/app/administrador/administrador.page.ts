
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  constructor(
    /* private authSvs: AuthService, */
     private router: Router, 
     private afAuth: AngularFireAuth
     ) { }

  ngOnInit() {
  }
  cerrar() {
   console.log('salir');
   this.afAuth.signOut();
   this.router.navigateByUrl('/login');
  }

  async logout(email, password): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }


}
