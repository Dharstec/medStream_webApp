import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCasesComponent } from './all-cases.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SingleCaseComponent } from './single-case/single-case.component';
const routes: Routes = [
  {
    path: '',
    component: AllCasesComponent,
    children: []
  },
  {
    path: 'single-case/:id',
    component: SingleCaseComponent,
    children: []
  }
];



@NgModule({
  declarations: [
    AllCasesComponent,
    SingleCaseComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes), ReactiveFormsModule, MaterialModule
  ]
})
export class AllCasesModule { }
