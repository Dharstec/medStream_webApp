import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

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
            this.router.navigate(['auth/signUpOtp']);
          }
        } else {
          // If response structure is unexpected, show a generic error message
          // this.snackbar.open('Email verification failed. Please try again.', 'Close', { duration: 2000 });
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: 'Email verification failed. Please try again.',
          });
        }
      },
      (error) => {
        console.log(error);
        // Handle error response from backend
        if (error) {
          // this.snackbar.open(error, 'Close', { duration: 2000 });
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: error,
          });
        }
        else {
          // this.snackbar.open('Error verifying email. Please try again later.', 'Close', { duration: 2000 });
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: 'Error verifying email. Please try again later.',
          });
        }
      }
    );
  }
}

