import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DadosService } from './dados.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
    
  ],
  declarations: [
  	DashboardComponent
  ],
  exports: [
  	DashboardComponent
  ],
  providers: [
  	DadosService
  ]
})
export class DashboardModule { }
