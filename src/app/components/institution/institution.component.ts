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
  members: {title: string, key: string, url: string}[] = [
    {title: 'NORTH AMERICA', key: 'northamerica', url: '../../../assets/na1.png'},
    {title: 'EUROPE', key: 'europe', url: '../../../assets/europe1.png'},
    {title: 'ASIA', key: 'asia', url: '../../../assets/asia1.png'},
    {title: 'SOUTH AMERICA', key: 'southamerica', url: '../../../assets/sa1.png'},
    {title: 'AFRICA', key: 'africa', url: '../../../assets/africa1.png'},
    {title: 'OCEANIA', key: 'australia', url: '../../../assets/australia1.png'},
  ]

  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }


  selectContinent(list){
    this.router.navigate(['/user/institution',list.key])
  }
}
