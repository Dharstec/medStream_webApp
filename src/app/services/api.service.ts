import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { AppResponse } from './appResponse.modal';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient,private db: AngularFireDatabase) { }
  apiPutCall(postParam: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.put<AppResponse>(finalURL, postParam).pipe(catchError(this.handleError));
  }
  apiPostCall(postParam: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.post<AppResponse>(finalURL, postParam).pipe(catchError(this.handleError));
  }

  apiFormDataPostCall(postParam: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.post<AppResponse>(finalURL, postParam).pipe(catchError(this.handleError));
  }

  apiDeleteCall(id: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.delete<AppResponse>(finalURL + '/' + id).pipe(catchError(this.handleError));
  }

  apiGetCall(endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.get<AppResponse>(finalURL).pipe(catchError(this.handleError));
  }

  apiGetWorldTimeZone(): Observable<AppResponse> {
    let finalURL = 'http://worldtimeapi.org/api/timezone';
    return this.http.get<AppResponse>(finalURL).pipe(catchError(this.handleError));
  }

  apiGetDetailsCall(id: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.get<AppResponse>(finalURL + '/' + id).pipe(catchError(this.handleError));
  }
  getMessages(pageid:any) {
    return this.db.list(`/messages/${pageid}`).valueChanges();
  }

  sendMessage(pageid:any,message:any) {
    this.db.list(`/messages/${pageid}`).push(message);
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = 'Something bad happened; please try again later.';
  
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `${error}`;
    }
  
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }
  

}

