import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
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
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, MaterialModule,FontAwesomeModule
  ]
})
export class HomeModule { }
