import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { OtpComponent } from './otp/otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmailVerifyComponent } from './sign-up/email-verify/email-verify.component';
import { SignUpOtpComponent } from './sign-up/sign-up-otp/sign-up-otp.component';


const routes: Routes = [
  {
  path: '',
  component: AuthComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'forgetpassword', component: ForgetPasswordComponent },
    { path: 'otp', component: OtpComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'signUpPage', component: SignUpComponent },
    { path: 'signUp', component: EmailVerifyComponent },
    { path: 'signUpOtp', component:SignUpOtpComponent },
  ]
}
];

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    ForgetPasswordComponent,
    OtpComponent,
    ResetPasswordComponent,
    SignUpComponent,
    EmailVerifyComponent,
    SignUpOtpComponent,
    
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),ReactiveFormsModule,MaterialModule
  ]
})
export class AuthModule { }
