// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';
// import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

// @Component({
//   selector: 'app-email-verify',
//   templateUrl: './email-verify.component.html',
//   styleUrls: ['./email-verify.component.scss']
// })
// export class EmailVerifyComponent {
//   form: FormGroup;
//   submitted = false;

//   constructor(private fb: FormBuilder, 
//               private router: Router, 
//               private api: ApiService,
//               private snackbar: MatSnackBar) { }

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   onSubmit() {
//     if (this.form.invalid) {
//       return;
//     } else {
//       const email = this.form.value.email;
//       localStorage.setItem('signupEmail', email);

//       this.api.apiGetCall(`verifyEmail?email=${email}`).subscribe(
//         (data) => {
//           console.log(data);
//           if (data && data) {

//             this.router.navigate(['auth/signUpOtp']);
//             this.snackbar.open('Enter your OTP.', 'Close', { duration: 3000 });
//           } else {

//             this.snackbar.open(data.message || 'Email verification failed. Please try again.', 'Close', { duration: 3000 });
//           }
//         },
//         (error) => {
//           console.error(error);
//           this.snackbar.open('Error verifying email. Please try again later.', 'Close', { duration: 3000 });
//         }
//       );
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss']
})
export class EmailVerifyComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private api: ApiService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email;
    localStorage.setItem('signupEmail', email);

    this.api.apiGetCall(`verifyEmail?email=${email}`).subscribe(
      (data) => {
        console.log(data);
        if (data && data.status) {
          // If email is already verified, redirect to sign up OTP page
          if (data.isOtpVerified) {
            this.router.navigate(['auth/signUpPage']);
            // this.snackbar.open('Enter your OTP.', 'Close', { duration: 3000 });
          } else {
            // If email is verified but OTP is not, handle as needed
            // For now, redirect to sign up OTP page
            this.router.navigate(['auth/signUpOtp']);
          }
        } else if (data && !data.status && data.message) {
          // If email verification failed, show error message from backend
          this.snackbar.open(data.message, 'Close', { duration: 3000 });
        } else {
          // If response structure is unexpected, show a generic error message
          this.snackbar.open('Email verification failed. Please try again.', 'Close', { duration: 3000 });
        }
      },
      (error) => {
        console.error(error);
        this.snackbar.open('Error verifying email. Please try again later.', 'Close', { duration: 3000 });
      }
    );
  }
}

