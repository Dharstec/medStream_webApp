import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as _ from "lodash";
import * as moment from 'moment/moment.js';

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
  allSubCategoryList: any;
  institutionsFilterList: any=[];
  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getAllfilter();
    this.getLiveCasesList();
  }
  getLiveCasesList(): void {
    this.api.apiGetCall('allcase').subscribe((data) => {
      this.allCases = data.data;
      this.allCasesData = data.data;
      this.allCasesData.map(e=>{
        this.institutionsFilterList.push({
          "id":e.institution._id,
          "name":e.institution.name,
          "active":true
        })
      })
      this.institutionsFilterList=  _.uniqBy(this.institutionsFilterList,'name')
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
        console.log("checkedCategory",checkedCategory)
        console.log("allSubCategoryList",this.allSubCategoryList)
        console.log("subCategoryList",this.subCategoryList)
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
          if(e.id==list.id){
            e['active']=check
          }
        })
        break;
      }
    }
    let checkedCategory=[]
    let checkedSubCategory=[]
    let checkedInstitution=[]
    this.categoryList.map(e=>e.active ? checkedCategory.push(e.category):null)
    this.subCategoryList.map(e=>e.active ? checkedSubCategory.push(e.name):null)
    this.institutionsFilterList.map(e=>e.active ? checkedInstitution.push(e.id):null)
    // console.log("checkedCategory",checkedCategory)
    // console.log("checkedSubCategory",checkedSubCategory)
    // console.log("checkedInstitution",checkedInstitution)
    // console.log("startDate",moment(this.startDate))
    // console.log("endDate",moment(this.endDate))
    let body={
      "category":checkedCategory,
      "subCategory":checkedSubCategory,
      "dateFilter":{
          "active":this.startDate=='' || this.endDate=='' ? false:true,
          "startDate":this.startDate,
          "endDate":this.endDate
      },
      "institutions":checkedInstitution
    }
    this.api.apiPostCall(body,'filterCase').subscribe((data) => {
      this.allCases=data.data
    })
  }

  getAllfilter(): void {
    this.api.apiGetCall('filters').subscribe((data) => {
      this.categoryList = data.data;
      this.categoryList.map(e=>e['active']=true)
      console.log("categoryList",this.categoryList)
    
      this.categoryList.map((e:any)=>{
        e.subCategory.map(x=>{
          this.subCategoryList.push({
            "category":e.category,
            "name":x,
            "active":true
          })
        })
        // this.subCategoryList=  this.subCategoryList.concat(e.subCategory)
      })
      this.allSubCategoryList =this.subCategoryList
      // console.log("subCateg",this.subCategoryList)
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
