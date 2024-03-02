// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';
// import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

// @Component({
//   selector: 'app-sign-up-otp',
//   templateUrl: './sign-up-otp.component.html',
//   styleUrls: ['./sign-up-otp.component.scss']
// })
// export class SignUpOtpComponent {

//   form: FormGroup;
//   resendEnabled = true;
//   resendButtonText = 'Resend OTP';
//   countdownTimer: any;
//   countdownSeconds = 60;
//   submitted = false;


//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private api: ApiService,
//     private snackbar: MatSnackBar
//   ) { }

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
//     });

//     this.startCountdown();
//   }

//   ngOnDestroy(): void {
//     clearInterval(this.countdownTimer);
//   }

//   startCountdown(): void {
//     this.countdownTimer = setInterval(() => {
//       if (this.countdownSeconds > 0) {
//         this.countdownSeconds--;
//         this.updateResendButtonText();
//       } else {
//         this.stopCountdown();
//       }
//     }, 1000);
//   }

//   stopCountdown(): void {
//     clearInterval(this.countdownTimer);
//     this.resendEnabled = true;
//     this.updateResendButtonText();
//   }

//   updateResendButtonText(): void {
//     if (this.countdownSeconds === 0) {
//       this.resendButtonText = 'Resend OTP';
//     } else {
//       this.resendButtonText = `Resend OTP in ${this.countdownSeconds} seconds`;
//     }
//   }

//   resendOTP(): void {
//     this.resendEnabled = false; 
//     const otp = this.form.controls['otp'].value;
//     const signupEmail = localStorage.getItem('signupEmail')

  
//     this.api.apiGetCall(`verifyEmailOtp?email=${signupEmail}&otp=${otp}`).subscribe(
//       () => {
//         this.snackbar.open('OTP sent successfully.', 'Close', { duration: 3000 });
//         this.countdownSeconds = 60;
//         this.startCountdown();
//       },
//       error => {
//         console.error(error);
//         this.snackbar.open('Failed to resend OTP. Please try again later.', 'Close', { duration: 3000 });
//         this.resendEnabled = true; 
//       }
//     );
//   }

//   getOtpErrorMessage(): string {
//     const control = this.form.get('otp');
//     if (control && control.dirty && control.invalid) {
//       if (control.hasError('pattern')) {
//         return 'OTP must be a number';
//       } else if (control.hasError('required')) {
//         return 'OTP is required';
//       }
//     }
//     return '';
//   }
//   onSubmit() {
//     this.submitted = true;

//     if (this.form.invalid) {
//       return;
//     } else {
//       const otp = this.form.controls['otp'].value;
//       const signupEmail = localStorage.getItem('signupEmail')

//       this.api.apiGetCall(`verifyEmailOtp?email=${signupEmail}&otp=${otp}`).subscribe(data => {
//         if (data && data.message && data.message.includes('success')) {
//           this.router.navigate(['/auth/signUpPage']);

//           this.snackbar.openFromComponent(SnackbarComponent, {
//             data: data.message,
//           })

//         } else {

//           this.snackbar.openFromComponent(SnackbarComponent, {
//             data: data.message,
//           })
//         }
//       }, error => {
//         console.error(error);

//         this.snackbar.openFromComponent(SnackbarComponent, {
//           data: 'Error verifying OTP. Please try again later.',
//         })
//       });
//     }
//   }
// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-sign-up-otp',
  templateUrl: './sign-up-otp.component.html',
  styleUrls: ['./sign-up-otp.component.scss']
})
export class SignUpOtpComponent implements OnInit, OnDestroy {

  form: FormGroup;
  resendEnabled = true;
  resendButtonText = 'Resend OTP';
  countdownTimer: any;
  countdownSeconds = 60;
  submitted = false;

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
    this.countdownTimer = setInterval(() => {
      if (this.countdownSeconds > 0) {
        this.countdownSeconds--;
        this.updateResendButtonText();
      } else {
        this.stopCountdown();
      }
    }, 1000);
  }

  stopCountdown(): void {
    clearInterval(this.countdownTimer);
    this.resendEnabled = true;
    this.updateResendButtonText();
  }

  updateResendButtonText(): void {
    if (this.countdownSeconds === 0) {
      this.resendButtonText = 'Resend OTP';
    } else {
      this.resendButtonText = `Resend OTP in ${this.countdownSeconds} seconds`;
    }
  }

  resendOTP(): void {
    this.resendEnabled = false; // Disable resend button until countdown ends

    // Add logic to resend OTP
    const otp = this.form.controls['otp'].value;
    const signupEmail = localStorage.getItem('signupEmail');

    // Call API to resend OTP
    this.api.apiGetCall(`verifyEmailOtp?email=${signupEmail}&otp=${otp}`).subscribe(
      () => {
        this.snackbar.open('OTP sent successfully.', 'Close', { duration: 3000 });
        this.countdownSeconds = 60; // Reset countdown timer
        this.startCountdown(); // Restart countdown
      },
      error => {
        console.error(error);
        this.snackbar.open('Failed to resend OTP. Please try again later.', 'Close', { duration: 3000 });
        this.resendEnabled = true; // Re-enable resend button on error
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
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      const otp = this.form.controls['otp'].value;
      const signupEmail = localStorage.getItem('signupEmail');

      this.api.apiGetCall(`verifyEmailOtp?email=${signupEmail}&otp=${otp}`).subscribe(data => {
        if (data && data.message && data.message.includes('success')) {
          this.router.navigate(['/auth/signUpPage']);
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
