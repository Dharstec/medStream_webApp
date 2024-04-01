import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-single-case',
  templateUrl: './single-case.component.html',
  styleUrls: ['./single-case.component.scss']
})
export class SingleCaseComponent implements OnInit {
  current_case_id: any
  recommendList: any;
  current_case_dtls: any;
  videoURL: any
  instName: any;
  isShareClicked: boolean = false;
  isLiveCase: boolean;
  showChat: boolean = true;
  showComment: boolean = true;
  // hideCommentBox: boolean;
  // isScheduleCase: boolean;

  constructor(private api: ApiService,private util: UtilService, public dialog: MatDialog, private _sanitizer: DomSanitizer, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.current_case_id = this.route.snapshot.paramMap.get('id')
    this.route.queryParams.subscribe(params => {
      // Check if the query parameter indicates that the chat box should be hidden
      // this.hideChat = params['hideChat'] === 'true';
      // this.isLiveCase = params['isLive'] === 'true';
      // if (this.isScheduleCase) {
      //   this.hideCommentBox = true;
      // }
      this.showComment = params['showComment'] === 'true';
      this.showChat = params ['showChat'] === 'true';
  });
    // console.log("--", this.current_case_id)
    this.getCaseDetails()
  }


  getCaseDetails(): void {
    this.api.apiGetDetailsCall(this.current_case_id, 'singlecase').subscribe((data) => {
      this.current_case_dtls = data.data;
      let splitData = this.current_case_dtls.youtubeUrl.split('?')
      // console.log("splitData", splitData)
      let videoID = splitData[0].split('be/')[1]
      let embdURL = `https://www.youtube.com/embed/${videoID}`
      this.videoURL = this._sanitizer.bypassSecurityTrustResourceUrl(embdURL);
      // console.log("videoURL",this.videoURL)
      // this.videoURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.current_case_dtls.youtubeUrl);
      this.getRecommendCase(this.current_case_dtls.category,this.current_case_dtls.subCategory);
      // console.log(this.current_case_dtls.institution)
    })
  }
  getRecommendCase(category,subCategory): void {
    let url = `recommendcase?category=${category}&subCategory=${subCategory}`
    this.api.apiGetCall(url).subscribe((data) => {
      let recommendListArray = data.data;
      this.recommendList = this.util.shuffle(recommendListArray)
    })
  }

  share(){
    // console.log("sharing",navigator.share)
    // console.log("current_case_dtls",this.current_case_dtls)
    const baseURL= environment.baseURL
    let showComment = this.current_case_dtls.liveStatus ? 'showChat=true' : 'showComment=true'
    let shareURL = baseURL +`user/all-cases/single-case/${this.current_case_dtls._id}?${showComment}`
    if(navigator.share){
      navigator.share({
        "title":'Medstream360 Link',
        "url":shareURL
      }).then((res)=>{
        console.log("thanks for sharing",res)
      }).catch(console.error)
    }
  }
  
  // isLiveCase(currentCase): boolean {
  //   return currentCase && currentCase.type === 'live';
  // }



  routeToSingleCase(caseId) {
    this.router.navigate(['/user/all-cases/single-case',caseId],{ queryParams: { showComment: 'true' } })
    this.current_case_id =caseId
    this.getCaseDetails()
    window.scrollTo(0, 0);
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    //   this.router.navigate(['/user/all-cases/single-case', caseId]));
    // // this.ngOnInit()
  }

  routeToInstitute(data){
    let cont = data.institution.continent.toLowerCase().replace(/\s/g, '')
    this.util.setInstitution(data.institution)
    this.router.navigate(['/user/institution',cont])
  }

  onShareButtonClick() {
    this.isShareClicked = !this.isShareClicked;
  }

  onCloseButtonClick() {
    this.isShareClicked = false;
  }
}
