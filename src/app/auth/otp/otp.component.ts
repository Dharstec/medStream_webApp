import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit,OnDestroy{

  form: FormGroup;
  submitted = false;
  otpErrors = {
    required: 'OTP is required',
    pattern: 'OTP must be a number',
    exactLength: 'OTP must be exactly 6 characters'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  getOtpErrorMessage() {
    const control = this.form.get('otp');
    if (control && control.dirty && control.invalid) {
      if (control.hasError('pattern')) {
        return this.otpErrors['pattern'];
      } else if (control.hasError('required')) {
        return this.otpErrors['required'];
      } else if (control.hasError('minlength') || control.hasError('maxlength')) {
        return this.otpErrors['exactLength'];
      }
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      const email = localStorage.getItem('forgotPasswordEmail');
      const flag = localStorage.getItem('forgotPasswordFlag');
      const otp = this.form.controls['otp'].value;

      const payload = {
        email: email,
        flag: flag,
        otp: otp
      };

      this.api.apiPostCall(payload, 'verifyUserOtp').subscribe(data => {
        if (data && data.message && data.message.includes('success')) {
          this.router.navigate(['/auth/resetPassword']);
          this.snackbar.open(data.message, 'Close', {
            duration: 3000
          });
        } else {
          this.snackbar.open(data.message, 'Close', {
            duration: 3000
          });
        }
      }, error => {
        console.error(error);
        this.snackbar.open('Error verifying OTP. Please try again later.', 'Close', {
          duration: 3000
        });
      });
    }
  }

  ngOnDestroy() { }
}



