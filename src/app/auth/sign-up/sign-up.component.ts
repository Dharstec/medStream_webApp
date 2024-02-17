// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';
// import * as moment from 'moment-timezone';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.scss']
// })
// export class SignUpComponent implements OnInit {
//   form: FormGroup;
//   submitted = false;
//   timeZones = [];

//   constructor(private fb: FormBuilder, 
//               private router: Router, 
//               private api: ApiService,
//               private snackbar: MatSnackBar) { }

//   ngOnInit(): void {
//     this.timeZones = moment.tz.names().map(timeZone => ({
//       label: timeZone,
//       value: timeZone
//     }));
//     this.form = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       email: { value: localStorage.getItem('signupEmail'), disabled: true },
//       password: ['', [
//         Validators.required,
//         Validators.minLength(8),
//         Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
//       ]],
//       confirmPassword: ['', Validators.required],
//       timeZone: [this.timeZones[0].value, Validators.required]
//       // timeZone: ['UK', Validators.required]
//     }, {
//       validators: this.passwordMatchValidator
//     });
//   }

//   onSubmit() {
//     this.submitted = true;

//     if (this.form.invalid) {
//       return;
//     }

//     const payload = {
//       name: this.form.value.name,
//       email: this.form.value.email,
//       password: this.form.value.password,
//       timeZone: this.form.value.timeZone
//     };

//     this.api.apiPostCall(payload, 'singup').subscribe(
//       (data) => {
//         console.log(data);
//         this.router.navigate(['/login']);
//         this.snackbar.open('Signup successful. Please login.', 'Close', { duration: 3000 });
//       },
//       (error) => {
//         console.error(error);
//         this.snackbar.open('Error signing up. Please try again later.', 'Close', { duration: 3000 });
//       }
//     );
//   }


//   passwordMatchValidator(formGroup: FormGroup) {
//     const password = formGroup.get('password').value;
//     const confirmPassword = formGroup.get('confirmPassword').value;

//     if (password !== confirmPassword) {
//       formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });
//     } else {
//       formGroup.get('confirmPassword').setErrors(null);
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  timeZones = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.timeZones = moment.tz.names().map(timeZone => ({
      label: timeZone,
      value: timeZone
    }));
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: { value: localStorage.getItem('signupEmail'), disabled: true },
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      confirmPassword: ['', Validators.required],
      timeZone: [this.timeZones[0].value, Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const payload = {
      name: this.form.value.name,
      email: localStorage.getItem('signupEmail'),
      password: this.form.value.password,
      timeZone: this.form.value.timeZone
    };

    this.api.apiPostCall(payload, 'singup').subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/login']);
        this.snackbar.open('Signup successful. Please login.', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error(error);
        this.snackbar.open('Error signing up. Please try again later.', 'Close', { duration: 3000 });
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }
}
