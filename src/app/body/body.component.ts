import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  show: boolean;
  constructor(private router: Router) {
    let token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.router['url'] == '/auth/login') {
        this.show = false;
      } else {
        this.show = true;
      }
    }, 100)
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

}
