import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navMenuBar } from '../navdata';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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
constructor(private authService: AuthService,
  private util:UtilService,
   private router: Router) {

 }

  ngOnInit(): void {
  this.screenWidth=window.innerWidth;
  this.util.getObservable().subscribe((res) => {
    if(res.globalSearch && res.globalSearch){
      console.log('navsearch',res.globalSearch)
      this.searchFilter = res.globalSearch=='null'? '':this.searchFilter
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

  profile(){
    if(this.authService.isLoggedIn()){
      this.authService.setLoggedInStatus(false)
      localStorage.clear()
    }
    this.router.navigate(['/auth/login'])
  }
}
