import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent {
  members: {title: string, key: string, lat: number,lon:number, url: string}[] = [
    {title: 'NORTH AMERICA', key: 'northamerica', lat:7.18805555556,lon:21.0936111111, url: '../../../assets/na1.png'},
    {title: 'EUROPE', key: 'europe', lat:7.18805555556,lon:21.0936111111, url: '../../../assets/europe1.png'},
    {title: 'ASIA', key: 'asia',  lat:7.18805555556,lon:21.0936111111, url: '../../../assets/asia1.png'},
    {title: 'SOUTH AMERICA', key: 'southamerica',  lat:7.18805555556,lon:21.0936111111, url: '../../../assets/sa1.png'},
    {title: 'AFRICA', key: 'africa', lat:7.18805555556,lon:21.0936111111, url: '../../../assets/africa1.png'},
    {title: 'OCEANIA', key: 'australia',  lat:7.18805555556,lon:21.0936111111, url: '../../../assets/australia1.png'},
  ]

  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }


  selectContinent(list){
    this.router.navigate(['/user/institution',list.key])
  }
}
