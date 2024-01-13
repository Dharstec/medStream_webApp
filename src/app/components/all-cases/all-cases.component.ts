import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  allCases: any;
  categoryList: any;
  startDate:any=''
  endDate:any=''
  subCategoryList:any=[]
  allCasesData: any;
  allSubCategoryList: any=[];
  filteredData: any=[];
  institutionsFilterList: any=[];
  operatorFilterList: any=[];
  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router,
    private util: UtilService) { }

  ngOnInit(): void {
    this.util.getObservable().subscribe((res) => {
      if(res.globalSearch && res.globalSearch){
        let searchValue= res.globalSearch.toLowerCase()
        this.allCases = searchValue!='null' ? this.filteredData.filter(e=>e.title.trim().toLowerCase().includes(searchValue)) : this.filteredData   
      }
    })
    this.getAllfilter();
    this.getLiveCasesList();
  }
  getLiveCasesList(): void {
    this.api.apiGetCall('allcase').subscribe((data) => {
      this.util.setObservable('globalSearch','null')
      this.allCases = data.data;
      this.allCasesData = data.data;
      this.filteredData=this.allCasesData
    })
  }

  changeCategoryFilter(list,event,type){
    let check = event.target.checked
    switch(type){
      case 'category':{
        let checkedCategory =[]
        this.categoryList.map(e=>{
          if(e.category==list.category){
            e['active']=check
          }
          if(e['active']){
            checkedCategory.push(e.category) 
          }
        })
        this.subCategoryList= this.allSubCategoryList.filter(e=>checkedCategory.includes(e.category))
        break;
      }
      case 'sub':{
        this.subCategoryList.map(e=>{
          if(e.name==list.name){
            e['active']=check
          }
        })
        break;
      }
      case 'institute':{
        this.institutionsFilterList.map(e=>{
          if(e._id==list._id){
            e['active']=check
          }
        })
        break;
      }
      case 'operator':{
        this.operatorFilterList.map(e=>{
          if(e._id==list._id){
            e['active']=check
          }
        })
        break;
      }
    }
    let allCategory=[]
    let allSubCategory=[]
    let allInstitution=[]
    let allOperator=[]
    let checkedCategory=[]
    let checkedSubCategory=[]
    let checkedInstitution=[]
    let checkedOperator=[]
    
    this.categoryList.map(e=>{
      allCategory.push(e.category)
      if(e.active) checkedCategory.push(e.category)
    })
  this.allSubCategoryList.map(e=>allSubCategory.push(e.name))
  this.subCategoryList.map(e=>e.active ? checkedSubCategory.push(e.name) : null)
    this.institutionsFilterList.map(e=>{
      allInstitution.push(e._id)
      if(e.active) checkedInstitution.push(e._id)
    })
    this.operatorFilterList.map(e=>{
      allOperator.push(e._id)
      if(e.active) checkedOperator.push(e._id)
    })
    // console.log("checkedCategory",checkedCategory)
    // console.log("checkedSubCategory",checkedSubCategory)
    // console.log("checkedInstitution",checkedInstitution)
    // console.log("startDate",moment(this.startDate))
    // console.log("endDate",moment(this.endDate))
    let body={
      "category":checkedCategory.length ==0 ? allCategory : checkedCategory,
      "subCategory":checkedSubCategory.length == 0 ? allSubCategory : checkedSubCategory,
      "dateFilter":{
          "active":this.startDate=='' || this.endDate=='' ? false:true,
          "startDate":this.startDate,
          "endDate":this.endDate
      },
      "institutions": checkedInstitution.length == 0 ? allInstitution : checkedInstitution,
      "operators": checkedOperator.length == 0 ? allOperator : checkedOperator,
    }
    this.api.apiPostCall(body,'filterCase').subscribe((data) => {
      this.allCases=data.data
      this.filteredData=this.allCases
      this.util.setObservable('globalSearch','null')
    })
  }

  getAllfilter(): void {
    this.api.apiGetCall('filters').subscribe((data) => {
      this.categoryList = data.data.category_list
      this.institutionsFilterList = data.data.institution_list
      this.operatorFilterList = data.data.operator_list
      this.categoryList.map(e=>e['active']=false)
      this.institutionsFilterList.map(e=>e['active']=false)
      this.operatorFilterList.map(e=>e['active']=false)
      console.log("categoryList",this.categoryList)
    
      this.categoryList.map((e:any)=>{
        e.subCategory.map(x=>{
          this.allSubCategoryList.push({
            "category":e.category,
            "name":x,
            "active":false
          })
        })
        // this.subCategoryList=  this.subCategoryList.concat(e.subCategory)
      })

    })
  }

  clearFilter(){
    this.subCategoryList=[]
    this.categoryList.map(e=>e['active']=false)
    this.allSubCategoryList.map(e=>e['active']=false)
    this.institutionsFilterList.map(e=>e['active']=false)
    this.operatorFilterList.map(e=>e['active']=false)
    this.startDate=''
    this.endDate=''
    this.getLiveCasesList();
  }

  routeToSingleCase(caseId){
    this.router.navigate(['/user/all-cases/single-case',caseId])
  }
}
