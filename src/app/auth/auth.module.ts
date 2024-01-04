import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
const routes: Routes = [
  {
  path: '',
  component: AuthComponent,
  children: [
    { path: 'login', component: LoginComponent },
  ]
}
];

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),ReactiveFormsModule,MaterialModule
  ]
})
export class AuthModule { }
