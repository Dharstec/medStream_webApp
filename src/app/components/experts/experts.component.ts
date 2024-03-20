import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
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

  // ---------
  getInstituteList() {
    this.api.apiGetCall('institute').subscribe((data) => {
      this.instituteList = data.data;
      this.filteredInstituteList = this.instituteList;
    })
    
  }


  // ---------
  getOperatorsList() {
    this.api.apiGetCall('operator').subscribe((data) => {
      this.operators = data.data;
      this.filterdOperators = data.data;
    })
    // this.instituteFilterControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this.filterInstitutes(value))
    // ).subscribe(filteredInstitutes => {
    //   this.filteredInstituteList = filteredInstitutes;
    // });
  }

  onKey(eventTarget: any) {
    this.filteredInstituteList = this.search(eventTarget.value);
  }
  search(value: string) {
    if(value!=''){
      let filter = value.toLowerCase();
      return this.instituteList.filter((option) =>
        option.name.toLowerCase().startsWith(filter) || 
        (this.institutes?.value!=null && this.institutes?.value.length && this.institutes?.value.includes(option._id))
      );
    } 
    else return this.instituteList
   
  }

  applyTypeFilter() {
    if (this.institutes?.value) {
      this.filterdOperators= this.operators.filter(item => {
        if (this.institutes?.value?.length && !this.institutes?.value?.includes(item.institution._id)) {
          return false;
        }
        return true;
      });
    } else {
      this.filterdOperators = this.operators
    }
  }
  // onInstituteSearch(value: string) {
  //   if (value !== '') {
  //     const filter = value.toLowerCase();
  //     this.filteredInstituteList = this.instituteList.filter(institute =>
  //       institute.name.toLowerCase().includes(filter)
  //     );
  //   } else {
  //     this.filteredInstituteList = this.instituteList; // Show all institutes if search box is empty
  //   }
  // }
}
