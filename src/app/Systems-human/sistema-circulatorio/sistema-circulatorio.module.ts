import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SistemaCirculatorioPageRoutingModule } from './sistema-circulatorio-routing.module';

import { SistemaCirculatorioPage } from './sistema-circulatorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SistemaCirculatorioPageRoutingModule
  ],
  declarations: [SistemaCirculatorioPage]
})
export class SistemaCirculatorioPageModule {}
