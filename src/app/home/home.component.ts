import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { faInstagram, faLinkedin, faTwitter, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable, timer } from 'rxjs';


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
  
  categoryList: any=[]
  topVideosList: any=[]
  latestVideos:any=[]
  caseOfTheWeekList:any=[]
  scheduleVideo:any=[]
  mapURL:string


  index=0
  currentIndex=0

  subscription: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getHomePageAPI();
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.currentIndex =this.latestVideos.length -1 == this.currentIndex ? 0 :this.currentIndex +1 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getHomePageAPI(): void {
    this.api.apiGetCall('homePage').subscribe((data) => {
      let response = data.data;

      this.scheduleVideo=response.scheduleVideo
      if(this.scheduleVideo.length){
        this.mapURL='https://www.google.com/maps/embed/v1/place?key=AIzaSyC2-pW-Ed4xsWyy2UEzplNetgTR5XGYLWI&q=Medanta+The+Medicit,Delhi&zoom=15'
      }
      this.topVideosList=response.topVideos
      this.latestVideos=response.latestVideos
      this.caseOfTheWeekList=response.caseOfTheWeek
      this.categoryList=response.categoryList

    })
  }

  enrouteCase(list){
    this.router.navigate(['/user/all-cases/single-case',list._id])
  }



}
