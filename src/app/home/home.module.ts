import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { NgxSpinnerModule } from 'ngx-spinner';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: []
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    HomeCarouselComponent,
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, MaterialModule,FontAwesomeModule,NgxSpinnerModule
  ]
})
export class HomeModule { }
