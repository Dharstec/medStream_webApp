import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.component.html',
  styleUrls: ['./all-cases.component.scss']
})
export class AllCasesComponent {
  allCases: any;
  categoryList: any;
  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getAllfilter();
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

  getAllfilter(): void {
    this.api.apiGetCall('filters').subscribe((data) => {
      this.categoryList = data.data;
    })

   
    // this.api.apiGetCall('getAllfilterCategory').subscribe((data) => {
    //   console.log(data)
    // })
    // this.api.apiGetCall('getAllfilterCategory').subscribe((data) => {
    //   console.log(data)
    // })
  }

  routeToSingleCase(caseId){
    this.router.navigate(['/user/all-cases/single-case',caseId])
  }
}
