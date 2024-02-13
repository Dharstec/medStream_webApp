import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { timeZoneList } from 'src/app/staticData/timeZoneList';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    // {
    //   label: `<i class="fas fa-fw fa-pencil-alt"></i>`,
    //   a11yLabel: 'Edit',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.handleEvent('Edited', event);
    //   },
    // },
    // {
    //   label: `<i class="fas fa-fw fa-trash-alt"></i>`,
    //   a11yLabel: 'Delete',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter((iEvent) => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   },
    // },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: { ...colors.red },
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: { ...colors.yellow },
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: { ...colors.blue },
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: { ...colors.yellow },
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;
  allScheduleList: any;
  userTimeZone: any;
  regionTimeZone: any='Asia/Kolkata';
  regionTimeZoneList: any;
  loggedIn:boolean=false;
  isScheduleCase: boolean;

  constructor(private authService: AuthService,private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router,) {
    window.scrollTo(0, 0);
   
  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.regionTimeZoneList = timeZoneList.countryTimeZoneList
    this.loggedIn=false
    this.getScheduleCasesList(this.regionTimeZone)
    }else{
      this.loggedIn=true
      this.getScheduleCasesList()
    }
  }

  getWorldTimezoneList(): void {
    // this.api.apiGetWorldTimeZone().subscribe((data:any) => {
    //   this.regionTimeZoneList = data
    // })
  }

  getScheduleCasesList(timeZone?:any): void {
    this.userTimeZone = timeZone ? timeZone : localStorage.getItem('userRegion')
    this.api.apiGetCall(`schedulecase?timeZone=${this.userTimeZone}`).subscribe((data) => {
      this.allScheduleList = data.data;
      this.events=[]
      this.isScheduleCase = true;
      this.allScheduleList.map(e=>{
        this.events.push({
          id:e._id,
          start: new Date((e.startTime)),
          end: new Date((e.endTime)),
            title: e.title,
            color: { ...colors.red },
            // actions: e.youtubeUrl,
            allDay: false,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            draggable: false,
        })
      })
     console.log("----------",this.events)

    })
  }

  // private modal: NgbModal
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd,
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map((iEvent) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log('clicked event',this.modalData)
    if(action=='Clicked'){
      this.router.navigate(['/user/all-cases/single-case',event.id,{ queryParams: { isLive: 'true' } }])
    }
  }


  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}


