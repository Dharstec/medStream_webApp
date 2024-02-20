import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable, timer } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent {
  @Input() caseOfTheWeekList : any;

  currentIndex=0

  subscription: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  constructor( private router: Router,
    private util: UtilService,
    private authService: AuthService) {
      window.scrollTo(0, 0);
     }
  ngOnInit(): void {
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.currentIndex =this.caseOfTheWeekList.length -1 == this.currentIndex ? 0 :this.currentIndex +1 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  enrouteCase(list){
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/auth/login'])
      }else{
        this.router.navigate(['/user/all-cases/single-case',list._id],{ queryParams: { showComment: 'true' } })
      }
  }

}


