import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { faInstagram, faLinkedin, faTwitter, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent {
  facebook = faFacebook;
  instagram = faInstagram;
  twitterX = faXTwitter;
  linkedIn = faLinkedin;

  // experts: any;
  institute: any;
  // experts: any[];
  // institutes: any[] = [];
  operators: any;
  id: any;
  constructor(private api: ApiService, public dialog: MatDialog, private _sanitizer: DomSanitizer, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.operators= this.route.snapshot.paramMap.get('id')
    this.getOperatorsList()
    // console.log("--",this.operators)
  }
  // getExpertsList(){
  //   this.api.apiGetCall('experts').subscribe((data)=>{
  //     this.experts = data.data;

  //     console.log(this.experts)

  //     if (this.experts && this.experts.length > 0) {

  //       this.experts.forEach((expert) => {
  //         const instituteId = expert.institution;

  //         this.getSingleInstitute(instituteId);
  //       });
  //     }
  //   })
  // }
  // getSingleInstitute(instituteId: string) {
  //   this.api.apiGetCall(`institute/${instituteId}`).subscribe((data) => {
  //     const instituteData = data.data;
  //     this.institutes.push(instituteData);
  //     console.log('Institute Details:', instituteData);
  //   });
  //   this.api.apiGetDetailsCall(id,'institute').subscribe((data)=>{
  //     this.institute data.data;
  //     console.log(this.institute)
  //   })
  // }

  // getOperatorsList(): void {
  //   this.api.apiGetDetailsCall(this.operators,'operator').subscribe((data) => {
  //     this.operators = data.data;
  //   })
  // }
  getOperatorsList() {
    this.api.apiGetCall('operator').subscribe((data) => {
      this.operators = data.data;
      console.log(this.operators)
      console.log(this.operators.social_media_link.insta)
      // this.getInstitute()
    })
  }
  // getInstitute() {
  //   const institute = this.operators.institution
  //   console.log(institute)
  // }
}