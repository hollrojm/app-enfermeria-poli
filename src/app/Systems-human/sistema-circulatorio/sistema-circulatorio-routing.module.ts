import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SistemaCirculatorioPage } from './sistema-circulatorio.page';

const routes: Routes = [
  {
    path: '',
    component: SistemaCirculatorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaCirculatorioPageRoutingModule {}
