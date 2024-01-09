import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navMenuBar } from '../navdata';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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

constructor(private authService: AuthService, private router: Router) {

 }

  ngOnInit(): void {
  this.screenWidth=window.innerWidth;
}
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  profile(){
    if(this.authService.isLoggedIn()){
      this.authService.setLoggedInStatus(false)
      localStorage.clear()
    }
    this.router.navigate(['/auth/login'])
  }
}
