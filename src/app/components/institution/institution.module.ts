import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { GoogleMapsModule } from '@angular/google-maps'

import { InstitutionComponent } from './institution.component';
import { SingleInstituteComponent } from './single-institute/single-institute.component';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: InstitutionComponent,
    children: []
  },
  {
    path: ':continent',
    component: SingleInstituteComponent,
    children: []
  },
 
];

@NgModule({
  declarations: [
    InstitutionComponent,
    SingleInstituteComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes), ReactiveFormsModule, MaterialModule,FormsModule,GoogleMapsModule
  ]
})
export class InstitutionModule { }
