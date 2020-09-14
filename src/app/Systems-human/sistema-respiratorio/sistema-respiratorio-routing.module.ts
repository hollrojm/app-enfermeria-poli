import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SistemaRespiratorioPage } from './sistema-respiratorio.page';

const routes: Routes = [
  {
    path: '',
    component: SistemaRespiratorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaRespiratorioPageRoutingModule {}
