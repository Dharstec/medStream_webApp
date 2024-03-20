import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  currentInstitution:any

  private globalObservables: any = {
    globalSearch: null,
    loggedIn: false,
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

setInstitution(data:any){
  this.currentInstitution = data
}
getInstitution(){
   return this.currentInstitution
}

/*
   Random shuffle the array
*/
shuffle(array:any) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
}
