import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private globalObservables: any = {
    globalSearch: null,
  }
  
  private globalObj = new BehaviorSubject(this.globalObservables);
  globalValues = this.globalObj.asObservable();
  constructor() { }


 //sets the value to target key in global observable
 setObservable(target, value) {
  let curr = this.globalObj.getValue();
  if (curr.hasOwnProperty(target)) {
    curr[target] = value;
    this.globalObj.next(curr);
    // console.log( 'observable',value);
    // console.groupEnd();
  } else {
    console.log(target + " observable not found");
  }
}

getObservable(): Observable<any> {
  return this.globalValues;
}
}
