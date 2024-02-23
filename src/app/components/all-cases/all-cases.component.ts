import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as _ from "lodash";
import * as moment from 'moment/moment.js';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.component.html',
  styleUrls: ['./all-cases.component.scss']
})
export class AllCasesComponent {
  categoryExpand: boolean = false;
  allCases: any;
  caseOfTheWeek: any;
  categoryList: any;
  startDate: any = ''
  endDate: any = ''
  subCategoryList: any = []
  allCasesData: any;
  allSubCategoryList: any = [];
  filteredData: any = [];
  institutionsFilterList: any = [];
  operatorFilterList: any = [];
  allOperatorFilterList: any = [];
  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute,
    private util: UtilService) {
      window.scrollTo(0, 0);
      this.caseOfTheWeek=[
        {name:"Yes",active:false},
        {name:"No",active:false},
      ]
     }

  async ngOnInit(): Promise<void> {
    this.util.getObservable().subscribe((res) => {
      if (res.globalSearch && res.globalSearch) {
        let searchValue = res.globalSearch.toLowerCase()
        this.allCases = searchValue != 'null' ? this.filteredData.filter(e => e.title.trim().toLowerCase().includes(searchValue)
         || e.institution.name.trim().toLowerCase().includes(searchValue))
        //  || e.operator_id.some(x=>x.name.trim().toLowerCase().includes(searchValue)))
        : this.filteredData
      }
    })
    await this.getAllfilter();
    this.getLiveCasesList();

  }
  getLiveCasesList(): void {
    this.api.apiGetCall('allcase').subscribe((data) => {
      this.util.setObservable('globalSearch', 'null')
      this.allCases = data.data;
      this.allCasesData = data.data;
      this.filteredData = this.allCasesData
    })
  }

  changeCategoryFilter(list, event, type) {
    let check = event ? event.target.checked : true
    switch(type){
      case 'caseOfTheWeek':{
        this.caseOfTheWeek.map(e=>{
          if(e.name==list.name){
            e['active']=check
          }
        })
        break;
      }
      case 'category':{
        let checkedCategory =[]
        this.categoryList.map(e=>{
          if(e.category==list.category){
            e['active']=check
          }
          if (e['active']) {
            checkedCategory.push(e.category)
          }
        })
        this.subCategoryList = this.allSubCategoryList.filter(e => checkedCategory.includes(e.category))
        break;
      }
      case 'sub': {
        this.subCategoryList.map(e => {
          if (e.name == list.name) {
            e['active'] = check
          }
        })
        break;
      }
      case 'institute': {
        let checkedInstitute =[]
        this.institutionsFilterList.map(e => {
          if (e._id == list._id) {
            e['active'] = check
          }
          if (e['active']) {
            checkedInstitute.push(e._id)
          }
        })
        this.operatorFilterList = this.allOperatorFilterList.filter(e => checkedInstitute.includes(e.institution))
        break;
      }
      case 'operator': {
        this.operatorFilterList.map(e => {
          if (e._id == list._id) {
            e['active'] = check
          }
        })
        break;
      }
    }
    let allCategory=[]
    let allSubCategory=[]
    let allInstitution=[]
    let allOperator=[]
    let allCaseOfTheCase=[]
    let checkedCaseOftheWeek =[]
    let checkedCategory=[]
    let checkedSubCategory=[]
    let checkedInstitution=[]
    let checkedOperator=[]
    
    this.categoryList.map(e=>{
      allCategory.push(e.category)
      if (e.active) checkedCategory.push(e.category)
    })
    this.allSubCategoryList.map(e => allSubCategory.push(e.name))
    this.subCategoryList.map(e => e.active ? checkedSubCategory.push(e.name) : null)
    this.institutionsFilterList.map(e => {
      allInstitution.push(e._id)
      if (e.active) checkedInstitution.push(e._id)
    })
    this.allOperatorFilterList.map(e => allOperator.push(e._id))
    this.operatorFilterList.map(e => {
      // allOperator.push(e._id)
      if (e.active) checkedOperator.push(e._id)
    })
    this.caseOfTheWeek.map(e=>{
      allCaseOfTheCase.push(e.name)
      if(e.active) checkedCaseOftheWeek.push(e.name)
    })
    // console.log("checkedCategory",checkedCategory)
    // console.log("checkedSubCategory",checkedSubCategory)
    // console.log("checkedInstitution",checkedInstitution)
    // console.log("startDate",moment(this.startDate))
    // console.log("endDate",moment(this.endDate))
    let body = {
      "category": checkedCategory.length == 0 ? allCategory : checkedCategory,
      "subCategory": checkedSubCategory.length == 0 ? allSubCategory : checkedSubCategory,
      "dateFilter": {
        "active": this.startDate == '' || this.endDate == '' ? false : true,
        "startDate": this.startDate,
        "endDate": this.endDate
      },
      "institutions": checkedInstitution.length == 0 ? allInstitution : checkedInstitution,
      "operators": checkedOperator.length == 0 ? allOperator : checkedOperator,
      "caseOfTheWeek": checkedCaseOftheWeek.length == 0 ? allCaseOfTheCase : checkedCaseOftheWeek,
    }
    this.api.apiPostCall(body, 'filterCase').subscribe((data) => {
      this.allCases = data.data
      this.filteredData = this.allCases
      this.util.setObservable('globalSearch', 'null')
    })
  }

  getAllfilter() {
    return this.api.apiGetCall('filters').subscribe((data) => {
      this.categoryList = data.data.category_list
      this.institutionsFilterList = data.data.institution_list
      this.allOperatorFilterList = data.data.operator_list
      this.categoryList.map(e=>e['active']=false)
      this.institutionsFilterList.map(e=>e['active']=false)
      this.allOperatorFilterList.map(e=>e['active']=false)
      // console.log("categoryList",this.categoryList)
      // console.log("-------",this.caseOfTheWeek)
    
      this.categoryList.map((e:any)=>{
        e.subCategory.map(x=>{
          this.allSubCategoryList.push({
            "category": e.category,
            "name": x,
            "active": false
          })
        })
        // this.subCategoryList=  this.subCategoryList.concat(e.subCategory)
      })
      this.route.paramMap.subscribe((params: any) => {
        let type = params.get('category');
        if (type) {
          this.categoryList.map(e => {
            if (e.category == type) {
              e['active'] = true
              this.changeCategoryFilter(e, false, 'category')
            }
          })
          this.categoryExpand = true
        }

      }

      )

    })
  }

  clearFilter() {
    this.subCategoryList = []
    this.operatorFilterList=[]
    this.categoryList.map(e => e['active'] = false)
    this.allSubCategoryList.map(e => e['active'] = false)
    this.institutionsFilterList.map(e => e['active'] = false)
    // this.operatorFilterList.map(e => e['active'] = false)
    this.startDate = ''
    this.endDate = ''
    this.getLiveCasesList();
  }

  routeToSingleCase(caseId) {
    // this.router.navigate(['/user/all-cases/single-case',caseId])
    // Navigate to the single case page with an additional parameter to indicate if it's a live case or not
    this.router.navigate(['/user/all-cases/single-case' ,caseId ],{ queryParams: { showComment: 'true' } });

  }
}
