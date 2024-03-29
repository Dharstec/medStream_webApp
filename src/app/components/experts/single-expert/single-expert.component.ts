import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { faInstagram, faLinkedin, faTwitter, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-single-expert',
  templateUrl: './single-expert.component.html',
  styleUrls: ['./single-expert.component.scss']
})
export class SingleExpertComponent {
  facebook = faFacebook;
  instagram = faInstagram;
  twitterX = faXTwitter;
  linkedIn = faLinkedin;

  // experts: any;
  // institute: any;
  // experts: any[];
  instituteList: any= [];
  institutes = new FormControl();
  // instituteFilterControl = new FormControl();
  filteredInstituteList: any[];
  instituteSearchControl = new FormControl();
  
  operators: any;
  filterdOperators: any;
  id: any;
  constructor(private api: ApiService, public dialog: MatDialog, private _sanitizer: DomSanitizer, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.operators= this.route.snapshot.paramMap.get('id')
    this.getInstituteList()
    this.getOperatorsList()
    // console.log("--",this.operators)
  }
  // ---------
  getInstituteList() {
    this.api.apiGetCall('institute').subscribe((data) => {
      this.instituteList = data.data;
      this.filteredInstituteList = this.instituteList;
    })
    
  }
  getOperatorsList() {
    this.api.apiGetCall('operator').subscribe((data) => {
      this.operators = data.data;
      this.filterdOperators = data.data;
      // console.log(this.operators)
    })
  }
  
}
