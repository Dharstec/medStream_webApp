import { Component } from '@angular/core';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {
  members: {title: string, subtitle: string, content: string, url: string}[] = [
    {title: 'NORTH AMERICA', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'EUROPE', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'ASIA', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'SOUTH AMERICA', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'AFRICA', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'AUSTRALIA', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  ]
}
