import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SingleExpertComponent } from './single-expert/single-expert.component';
import { ExpertsComponent } from './experts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const routes: Routes = [
    {
        path: '',
        component: ExpertsComponent,
        children: []
      },
    {
      path: 'single-operator',
      component:SingleExpertComponent ,
      children: []
    },
  ];

@NgModule({
    declarations: [
        ExpertsComponent,
        SingleExpertComponent
      ],
      imports: [
        CommonModule,RouterModule.forChild(routes),ReactiveFormsModule, MaterialModule,FormsModule,FlexLayoutModule,FontAwesomeModule
      ],
  exports: [

    // Export other components, directives, or modules if needed
  ]
})
export class ExpertsComponentModule { }
