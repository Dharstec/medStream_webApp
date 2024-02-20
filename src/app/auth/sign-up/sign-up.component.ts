import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment-timezone';
import { FormControl } from '@angular/forms';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  timeZones = [];
  filteredTimeZones: string[];
  searchControl: FormControl = new FormControl('');
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

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
    // this.searchControl.valueChanges.subscribe(value => {
    //   this.filteredTimeZones = this.filterTimeZones(value);
    // });
  }

  // filterTimeZones(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.timeZones.filter(timeZone => timeZone.label.toLowerCase().includes(filterValue));
  // }

  // displayTimeZone(timeZone: any): string {
  //   return timeZone ? timeZone.label : '';
  // }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
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
        // this.snackbar.open('Signup successful. Please login.', 'Close', { duration: 3000 });
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'Signup successful. Please login.',
        })
      },
      (error) => {
        console.error(error);
        // this.snackbar.open('Error signing up. Please try again later.', 'Close', { duration: 3000 });
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'Error signing up. Please try again later.',
        })
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
