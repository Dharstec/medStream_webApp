import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { faInstagram, faLinkedin, faTwitter, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable, timer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  facebook = faFacebook;
  instagram = faInstagram;
  twitterX = faXTwitter;
  linkedIn = faLinkedin;

  categoryList: any = []
  topVideosList: any = []
  latestVideos: any = []
  caseOfTheWeekList: any = []
  scheduleVideo: any = []
  mapURL: any


  index = 0
  currentIndex = 0

  subscription: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  constructor(private api: ApiService, public dialog: MatDialog, private _sanitizer: DomSanitizer, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getHomePageAPI();
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.currentIndex = this.latestVideos.length - 1 == this.currentIndex ? 0 : this.currentIndex + 1
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getHomePageAPI(): void {
    this.api.apiGetCall('homePage').subscribe((data) => {
      let response = data.data;
      this.scheduleVideo = response.scheduleVideo
      console.log("this.scheduleVideo", this.scheduleVideo)
      if (this.scheduleVideo.length != 0) {
        // let mapUrl ='https://www.google.com/maps/embed/v1/place?key=AIzaSyCeHK9IJTPAf66X3Hxvzbr0CLg2xZ-0W_Y&q=Medanta+The+Medicit,Delhi&zoom=15'
        let address = this.scheduleVideo.institution.name.replace(/\s/g, '+');
        let city = this.scheduleVideo.institution.city
        let mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCeHK9IJTPAf66X3Hxvzbr0CLg2xZ-0W_Y&q=${address}+${city}&zoom=15`
        this.mapURL = this._sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
      }


      this.topVideosList = response.topVideos
      this.latestVideos = response.latestVideos
      this.caseOfTheWeekList = response.caseOfTheWeek
      this.categoryList = response.categoryList

    })
  }

  // enrouteCase(list){
  //   this.router.navigate(['/user/all-cases/single-case',list._id])
  // }
  enrouteCase(list) {
    this.router.navigate(['/user/all-cases/single-case', list._id], { queryParams: { showCommment: 'true' } });
  }
  //   enrouteCase(list, isLatestVideo: boolean){
  //     let queryParams = {};
  //     if(isLatestVideo) {
  //         queryParams = { showChat: 'true' };
  //     } else {
  //         queryParams = { showComment: 'true' }; 
  //     }
  //     this.router.navigate(['/user/all-cases/single-case', list._id], { queryParams: queryParams });
  // }




}
