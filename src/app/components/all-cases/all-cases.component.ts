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
  subCategoryList:any=[]
  allCasesData: any;
  allSubCategoryList: any;
  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getAllfilter();
    this.getLiveCasesList();
  }
  getLiveCasesList(): void {
    this.api.apiGetCall('allcase').subscribe((data) => {
      this.allCases = data.data;
      this.allCasesData = data.data;
    })
  }

  changeCategoryFilter(list,event){
    // console.log(list)
    // console.log(event)
    let check = event.target.checked
    this.categoryList.map(e=>{
      if(e.category==list.category){
        e['active']=check
      }
    })
    this.filterdData()
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

  filterdData(){
    let checkedCategory =[]
     this.categoryList.map(e=>{
      if(e.active==true){
         checkedCategory.push(e.category) 
      }
     })
     this.subCategoryList= this.allSubCategoryList.filter(e=>checkedCategory.includes(e.category))
    this.allCases =this.allCasesData.filter(e=>checkedCategory.includes(e.category))
    console.log("filterDATA",this.allCases)
  }

  routeToSingleCase(caseId){
    this.router.navigate(['/user/all-cases/single-case',caseId])
  }
}
