// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { UtilService } from 'src/app/services/util.service';
// import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit, OnDestroy {

//   form: FormGroup;
//   submitted = false;
//   starCount = new Array(500); // Number of stars
//   hidePassword: boolean = true;

//   constructor(private fb: FormBuilder, 
//     private authService: AuthService,
//     private router: Router, private api: ApiService,private snackbar: MatSnackBar,private util:UtilService) { }

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       email: ['', 
//       [Validators.required,Validators.email]
//       ],
//       password: ['', [
//         Validators.required,
//         Validators.minLength(8),
//         Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
//       ]]
//     })
//   }
//   togglePasswordVisibility() {
//     this.hidePassword = !this.hidePassword;
// }

//   onSubmit() {
//     this.submitted = true;
//     if (this.form.invalid) {
//       console.log(this.form)
//       return;
//     } else {
//       console.log('else',this.form)

//       const payload = {
//         email: this.form.controls['email'].value,
//         password: this.form.controls['password'].value
//       }
//       this.api.apiPostCall(payload, 'userLogin').subscribe(data => {
//         if(data.data.accessToken){
//           localStorage.setItem('token', data.data.accessToken)
//           localStorage.setItem('userEmail', data.data.email)
//           localStorage.setItem('userRegion', data.data.region)
//           localStorage.setItem('name',data.data.name)
//           console.log(data.data.name)
//           this.router.navigate(['/user/landing'])  
//           this.authService.setLoggedInStatus(true)
//           this.util.setObservable('loggedIn',true)
//           this.snackbar.openFromComponent(SnackbarComponent, {
//             data: 'LoggedIn Successfully',
//           });
//         }else{
//           this.snackbar.openFromComponent(SnackbarComponent, {
//             data: 'Failed to LoggedIn',
//           }); 
//           this.authService.setLoggedInStatus(false)
//           this.util.setObservable('loggedIn',false)
//         }
//       },
//       error => {
//         console.log(error);
//         this.snackbar.openFromComponent(SnackbarComponent, {
//         data: error.message,
//         });
//       })
//     }
//   }

//   ngOnDestroy() {

//   }
// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  starCount = new Array(500); // Number of stars
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private spinner:NgxSpinnerService,
    private router: Router, private api: ApiService,private snackbar: MatSnackBar,private util:UtilService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', 
      // Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      [Validators.required,Validators.email]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]]
    })
   
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form)
      return;
    } else {
      console.log('else',this.form)
      this.spinner.show()
      const payload = {
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value
      }
      this.api.apiPostCall(payload, 'userLogin').subscribe(data => {
        if(data.data.accessToken){
          localStorage.setItem('token', data.data.accessToken)
          localStorage.setItem('userEmail', data.data.email)
          localStorage.setItem('userRegion', data.data.region)
          // localStorage.setItem('userId',data.data.userId)
          localStorage.setItem('name',data.data.name)
          this.router.navigate(['/user/landing'])  
          this.authService.setLoggedInStatus(true)
          this.util.setObservable('loggedIn',true)
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: "Logged in successfully.",
          });
          console.log(data.message)
          this.spinner.hide()
        }else{
          this.snackbar.openFromComponent(SnackbarComponent, {
            data:data.message,
          }); 
          this.authService.setLoggedInStatus(false)
          this.util.setObservable('loggedIn',false)
          this.spinner.hide()
        }
      },
      error => {
        // console.log(error);
        // let errorMessage = 'An error occurred';
        // if (error.status === 401) {
        //   errorMessage = 'Incorrect Email or Password';
        // } else if (error.status === 500) {
        //   errorMessage = 'Server Error';
        // }
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: error,
        });
        this.spinner.hide()
      })
    }
  }

  ngOnDestroy() {

  }
}
