import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit,OnDestroy {

  form: FormGroup;
  // resendButtonText = 'Resend OTP';
  countdownSeconds = 0;
  countdownTimer: any;
  resendButtonText = 'Resend OTP';
  showCounter = true; 


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
    this.startCountdown();
  }
  ngOnDestroy(): void {
    clearInterval(this.countdownTimer);
  }
  startCountdown(): void {
    this.countdownSeconds = 60; // Initialize countdown to 60 seconds
    this.countdownTimer = setInterval(() => {
      if (this.countdownSeconds > 0) {
        this.countdownSeconds--;
      } else {
        clearInterval(this.countdownTimer);
        this.showCounter = false; // Hide counter
      }
    }, 1000);
  }

  resendOTP(): void {
    // Add logic to resend OTP
    const email = localStorage.getItem('forgotPasswordEmail');
    const flag = localStorage.getItem('forgotPasswordFlag');

    // Call API to resend OTP
    this.api.apiPostCall({ email, flag }, 'sendOTP').subscribe(
      () => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'OTP sent successfully.',
        })
        this.startCountdown(); // Restart countdown
        this.showCounter = true; // Show counter again
      },
      error => {
        console.error(error);
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'Failed to resend OTP. Please try again later.',
        })
      }
    );
  }

  getOtpErrorMessage(): string {
    const control = this.form.get('otp');
    if (control && control.dirty && control.invalid) {
      if (control.hasError('pattern')) {
        return 'OTP must be a number';
      } else if (control.hasError('required')) {
        return 'OTP is required';
      }
    }
    return '';
  }

  onSubmit() {
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
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: data.message,
          })
        } else {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: data.message,
          })
        }
      }, error => {
        console.error(error);
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'Error verifying OTP. Please try again later.',
        })
      });
    }
  }
}
