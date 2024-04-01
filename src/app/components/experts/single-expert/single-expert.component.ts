import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { faInstagram, faLinkedin, faTwitter, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-single-expert',
  templateUrl: './single-expert.component.html',
  styleUrls: ['./single-expert.component.scss']
})
export class SingleExpertComponent implements OnInit {
  facebook = faFacebook;
  instagram = faInstagram;
  twitterX = faXTwitter;
  linkedIn = faLinkedin;

  operators_id: any;
  single_ops_details: any;
  instituteList: any = [];
  institutes = new FormControl();
  filteredInstituteList: any[];
  instituteSearchControl = new FormControl();

  operators: any;
  filterdOperators: any;
  id: any;

  constructor(private api: ApiService,private util: UtilService, public dialog: MatDialog, private _sanitizer: DomSanitizer, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.operators_id = this.route.snapshot.paramMap.get('id');
    this.getOperatorsList();
  }

  getOpsDetails(): void {
    this.api.apiGetDetailsCall(this.operators_id, 'operator').subscribe((data) => {
      this.single_ops_details = data.data;
      console.log(this.single_ops_details);
    });
  }
  routeToSingleOps(opsId): void {
    this.operators_id = opsId;
    this.router.navigate(['/user/all-cases/single-case', opsId]).then(() => {
      this.getOpsDetails();
      window.scrollTo(0, 0);
    });
  }

  getOperatorsList(): void {
    this.api.apiGetCall('operator').subscribe((data) => {
      this.operators = data.data;
      // Filter the operators to find the single operator by ID
      const singleOperator = this.operators.find(operator => operator._id === this.operators_id);
      if (singleOperator) {
        this.single_ops_details = singleOperator;
        console.log(this.single_ops_details);
      } else {
        console.error('Single operator not found');
      }
    });
  }

  routeToInstitute(data){
    let cont = data.institution.continent.toLowerCase().replace(/\s/g, '')
    this.util.setInstitution(data.institution)
    this.router.navigate(['/user/institution',cont])
  }
}
