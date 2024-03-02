import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-single-institute',
  templateUrl: './single-institute.component.html',
  styleUrls: ['./single-institute.component.scss']
})
export class SingleInstituteComponent {
  selectedContinent: any;
  mapURL: string;
  allInstitutionList = []


  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };
  zoom = 3;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  markerPositions:any=[]

  // @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | any;
  // @ViewChildren(MapInfoWindow) infoWindowsView: QueryList<MapInfoWindow>;
  members: {title: string,cntName:string, key: string, lat: number,lng:number,zoom:number}[] = [
    {title: 'NORTH AMERICA',cntName:"North America", key: 'northamerica', lat:46.0730555556,lng:-100.546666667,zoom:3},
    {title: 'EUROPE',cntName:"Europe", key: 'europe', lat:50.2966666667,lng:9.14055555556,zoom:4},
    {title: 'ASIA',cntName:"Asia", key: 'asia',  lat:40.8405555556,lng:89.2966666667,zoom:2},
    {title: 'SOUTH AMERICA',cntName:"South America", key: 'southamerica',  lat:-14.6047222222,lng:-57.6561111111,zoom:3},
    {title: 'AFRICA',cntName:"Africa", key: 'africa', lat:7.18805555556,lng:21.0936111111,zoom:3},
    {title: 'AUSTRALIA',cntName:"Australia", key: 'australia',  lat:-18.3127777778,lng:138.515555556,zoom:4},
  ]
  showMap: boolean=false;
  markerInfo: any;

  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let keyName = this.route.snapshot.paramMap.get('continent')
    this.selectedContinent = this.members.filter(e=>e.key == keyName)[0]
    this.center['lat']= this.selectedContinent.lat
    this.center['lng']= this.selectedContinent.lng
    this.zoom= this.selectedContinent.zoom
    this.getInstitution()
  }

  getInstitution() {
    let queryName=this.selectedContinent.cntName.replace(/\s/g, '_');
    this.api.apiGetCall(`getInstituteListInUser?continent=${queryName}`).subscribe((data) => {
      this.allInstitutionList=data.data
      if(this.allInstitutionList.length){
        this.allInstitutionList.forEach(e=>{
          if(e.lat && e.lat!=null && e.lng && e.lng!=null){
            this.markerPositions.push({
              position:{
                lat: e.lat,
                lng: e.lng 
              },
              data: e
            })
          }
        })
        console.log('--------',this.markerPositions)
        this.allInstitutionList = data.data[0];
        this.markerInfo=data.data[0].name
        this.showMap=true
      }else{
        this.showMap=true
      }
     
    })
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  // markerPositions: google.maps.LatLngLiteral[] = [
  //   {
  //     lat: 24,
  //     lng: 12
  //   }
  // ];

  openInfoWindow(marker: MapMarker,markerPosition,windowIndex:number) {
    console.log("marker",marker)
    // let curIdx = 0;
    // this.infoWindow.forEach((window: MapInfoWindow,i) => {
    //   if (windowIndex === curIdx) {
    //     this.infoWindow[i].open(marker);
    //     curIdx++;
    //   } else {
    //     curIdx++;
    //   }
    // });
    this.allInstitutionList=markerPosition.data
    this.markerInfo=markerPosition.data.name
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }

}
