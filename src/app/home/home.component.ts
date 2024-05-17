import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { faInstagram, faLinkedin, faTwitter, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable, timer } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('imageContainer') imageContainer: ElementRef;

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
  lowResImageSrc = '../../assets/Hero Page_lowres.jpg';
  highResImageSrc = ''

  constructor(private api: ApiService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    public dialog: MatDialog,
    private _sanitizer: DomSanitizer,
    private snackbar: MatSnackBar,
    private router: Router,) { }

    ngAfterViewInit() {
      const image = this.imageContainer.nativeElement.querySelector('img');
      const highResImageUrl = image.getAttribute('data-src');
  
      // load high-resolution image
      const img = new Image();
      img.onload = () => {
        this.highResImageSrc = highResImageUrl;
        image.src = this.highResImageSrc;
      };
      img.src = highResImageUrl;
    }

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
    this.spinner.show()
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
      this.spinner.hide()
    })
  }

  enrouteCase(list, type?: any) {
    if (type == 'scheduleCase') {
      this.router.navigate(['/user/all-cases/single-case', list._id], { queryParams: { showChat: 'true' } })
    } else {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/auth/login'])
      } else {
        this.router.navigate(['/user/all-cases/single-case', list._id], { queryParams: { showComment: 'true' } })
      }
    }

  }

  image = '../../assets/Hero Page.jpg'
  defaultImage = '../../assets/Hero Page_lowres.jpg'
}
