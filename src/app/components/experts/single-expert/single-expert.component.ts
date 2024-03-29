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

  operators_id: any
  single_ops_details : any;
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
    this.operators_id= this.route.snapshot.paramMap.get('id')
    this.getInstituteList()
    this.getOperatorsList()
    // console.log("--",this.operators)
  }

  getOpsDetails(): void {
    this.api.apiGetDetailsCall(this.operators_id, 'operator').subscribe((data) => {
      this.single_ops_details = data.data;
      console.log(this.single_ops_details)
    })
  }
  routeToSingleOps(opsId) {
    this.router.navigate(['/user/all-cases/single-case',opsId])
    this.operators_id =opsId
    this.getOpsDetails()
    window.scrollTo(0, 0);
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
