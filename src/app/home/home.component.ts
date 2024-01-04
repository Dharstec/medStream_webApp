import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allCases: any;
  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getLiveCasesList();
  }
  getLiveCasesList(): void {
    this.api.apiGetCall('allcase').subscribe((data) => {
      this.allCases = data.data;
    })

    this.api.apiGetCall('getAllfilterCategory').subscribe((data) => {
      console.log(data)
    })
    // this.api.apiGetCall('getAllfilterCategory').subscribe((data) => {
    //   console.log(data)
    // })
    // this.api.apiGetCall('getAllfilterCategory').subscribe((data) => {
    //   console.log(data)
    // })
  }
}
