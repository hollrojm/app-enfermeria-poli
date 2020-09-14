import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SistemaRespiratorioPageRoutingModule } from './sistema-respiratorio-routing.module';

import { SistemaRespiratorioPage } from './sistema-respiratorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SistemaRespiratorioPageRoutingModule
  ],
  declarations: [SistemaRespiratorioPage]
})
export class SistemaRespiratorioPageModule {}
