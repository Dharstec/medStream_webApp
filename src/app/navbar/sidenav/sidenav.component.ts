import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navMenuBar } from '../navdata';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationEnd } from '@angular/router'; // Import NavigationEnd
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from 'src/app/services/util.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() onToogleSideNav: EventEmitter<SideNavToggle> = new EventEmitter
  screenWidth = 0;
  collapsed = false;
  navData = navMenuBar;

  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.screenWidth=window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    }
  }
  searchFilter: any;
  userdata:any
  loggedIn:any=false
  hamburg:boolean=false
  constructor(
    private authService: AuthService,
    private util:UtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.screenWidth=window.innerWidth;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Reset search filter when navigation ends
        this.searchFilter = '';
      }
    });

    this.util.getObservable().subscribe((res) => {
      if(res.globalSearch || res.loggedIn){
        this.searchFilter = res.globalSearch=='null'? '':this.searchFilter
        this.loggedIn= this.authService.isLoggedIn() ? true : res.loggedIn
        if(this.loggedIn){
          this.userdata={
            "email":localStorage.getItem("userEmail"),
            "region":localStorage.getItem("userRegion"),
            "name":localStorage.getItem("name")
          }
        }
      }
    })
  }
  
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  globalSearch(event:Event){
    let filterValue:any = (event.target as HTMLInputElement).value;
    filterValue = filterValue=='' ? 'null' : filterValue
    this.util.setObservable('globalSearch',filterValue)
  }

  logout(){
    if(this.authService.isLoggedIn()){
      this.authService.setLoggedInStatus(false)
      localStorage.clear()
      this.util.setObservable('loggedIn',false)
      this.loggedIn=false
    }
    this.router.navigate(['/auth/login'])
  }
  // isAllCasesRoute(): boolean {
  //   return this.router.url.startsWith('/user/all-cases');
  // }
  isAllCasesRoute(): boolean {
    return this.router.url === '/user/all-cases';
  }
  refreshPage() {
    // Navigating to the home page
    this.router.navigate(['/user/landing']).then(() => {
      // Refreshing the page
      window.location.reload();
    });
  }
  
}

