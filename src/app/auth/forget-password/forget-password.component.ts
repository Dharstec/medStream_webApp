import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private api: ApiService,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Using built-in email validator
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      const email = this.form.value.email; // Get the email from the form
      const payload = {
        email: email,
        flag: 'Customer' // Add the flag field to the payload
      };
      // Store email and flag in local storage before navigating to OTP component
      localStorage.setItem('forgotPasswordEmail', email);
      localStorage.setItem('forgotPasswordFlag', payload.flag);
      this.api.apiPostCall(payload, 'sendOTP').subscribe(
        (data) => {
          console.log(data);
          if (data && data.message && data.message.includes('Email id not found')) {
            // If the response indicates that the email ID was not found, show an error message
            this.snackbar.open(data.message, 'Close', {
              duration: 3000 // 3 seconds
            })
          } 
          else {
            this.router.navigate(['/auth/otp']);
            this.snackbar.open('Enter your OTP.', 'close',{duration:3000})
          }
        },
        (error) => {
          console.error(error);
          this.snackbar.open('Error sending OTP. Please try again later.', 'Close', {
            duration: 3000
          });
        }
      );
    }
  }

  ngOnDestroy() {
    // You can perform cleanup here if needed
  }
}

