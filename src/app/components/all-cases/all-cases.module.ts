import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCasesComponent } from './all-cases.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { DisqusModule } from 'ngx-disqus';

import { SingleCaseComponent } from './single-case/single-case.component';
import { ChatComponent } from 'src/app/chat/chat.component';
import { RelativeTimePipe } from 'src/app/chat/relative-time.pipe';
const routes: Routes = [
  {
    path: '',
    component: AllCasesComponent,
    children: []
  },
  {
    path: ':category',
    component: AllCasesComponent,
    children: []
  },
  // {
  //   path: 'single-case/:id',
  //   component: SingleCaseComponent,
  //   children: []
  // }
];



@NgModule({
  declarations: [
    AllCasesComponent,
    SingleCaseComponent,
    ChatComponent,
    RelativeTimePipe
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes), ReactiveFormsModule, MaterialModule,FormsModule,
    DisqusModule
  ]
})
export class AllCasesModule { }
