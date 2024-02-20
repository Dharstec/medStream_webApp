import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  hideNewPassword: boolean = true;
hideConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private api: ApiService, 
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+|~=`{}\\[\\]:";\'<>?,.\\/-]).{8,}$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }
  

  passwordsMatchValidator(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordsNotMatch': true } : null;
  }

  toggleNewPasswordVisibility() {
    this.hideNewPassword = !this.hideNewPassword;
}

toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
}

  onSubmit() {
    this.submitted = true;
    const email = localStorage.getItem('forgotPasswordEmail');
    const flag = localStorage.getItem('forgotPasswordFlag');
    if (this.form.invalid) {
      return;
    } else {
      const payload = {
        email: email,
        flag:flag,
        newPassword: this.form.controls['newPassword'].value,
        confirmPassword: this.form.controls['confirmPassword'].value
      }
      this.api.apiPostCall(payload, 'resetPassword').subscribe(data => {
        if(data && data.message && data.message.includes('Password Changed Successfully')) {
          this.router.navigate(['/auth/login']);
          // this.snackbar.open(data.message, 'Close', {
          //   duration: 3000 
          // }
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: data.message
          }
          );
        } else {
          // this.snackbar.open(data.message, 'Close', {
          //   duration: 3000 
          // }
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: data.message
          }
          );
        }
      }, error => {
        console.error(error);
        // this.snackbar.open('Error resetting password. Please try again later.', 'Close', {
        //   duration: 3000
        // }
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'Error resetting password. Please try again later.',
          }
        );
      });
    }
  }
}


