import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Inicio',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  },
  {
    path: 'Login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'Clases',
    pathMatch: 'full'
  },
  {
    path: 'Clases',
    loadChildren: () => import('./clases/clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: '',
    redirectTo: 'Contactenos',
    pathMatch: 'full'
  },
  {
    path: 'Contactenos',
    loadChildren: () => import('./contactenos/contactenos.module').then( m => m.ContactenosPageModule)
  },
  {
    path: '',
    redirectTo: 'Crear Cuenta',
    pathMatch: 'full'
  },
  {
    path: 'Crear Cuenta',
    loadChildren: () => import('./crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  {
    path: '',
    redirectTo: 'Perfil de Usuario',
    pathMatch: 'full'
  },
  {
    path: 'Perfil de Usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: '',
    redirectTo: 'Quienes Somos',
    pathMatch: 'full'
  },
  {
    path: 'Quienes Somos',
    loadChildren: () => import('./quienes-somos/quienes-somos.module').then( m => m.QuienesSomosPageModule)
  },
  {
    path: '',
    redirectTo: 'Simulador',
    pathMatch: 'full'
  },
  {
    path: 'Simulador',
    loadChildren: () => import('./simulador-clases/simulador-clases.module').then( m => m.SimuladorClasesPageModule)
  },
  {
    path: '',
    redirectTo: 'videos',
    pathMatch: 'full'
  },
  {
    path: 'videos',
    loadChildren: () => import('./videos/videos.module').then( m => m.VideosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
