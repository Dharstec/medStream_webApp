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

  apiGetDetailsCall(id: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.get<AppResponse>(finalURL + '/' + id).pipe(catchError(this.handleError));
  }
  getMessages(pageid:any) {
    return this.db.list(`/messages/${pageid}`).snapshotChanges()
    // .valueChanges();
  }

  sendMessage(pageid:any,message:any) {
    this.db.list(`/messages/${pageid}`).push(message);
  }

  /*
   Comment firebase DB 
  */

  getComments(pageid:any) {
    return this.db.list(`/comments/${pageid}`).valueChanges();
  }

  sendComments(pageid:any,message:any) {
    return this.db.list(`/comments/${pageid}`).push(message);
  }

  deleteComment(pageid:any,commentId:any) {
    this.db.database.ref(`/comments/${pageid}`)
    .on('value', (data) => {
      var obj = data.val();
      Object.keys(obj).forEach((key) => {
        if(obj[key].parentId==commentId){
          return this.db.list(`/comments/${pageid}`).remove(key)
        }
        if(obj[key].id == commentId){
          return this.db.list(`/comments/${pageid}`).remove(key)
        }
      });
    })
  }

  updateComment(caseId:any,commentId:any,userId,react) {
    this.db.database.ref(`/comments/${caseId}`)
    .on('value', (data) => {
      var obj = data.val();
      console.log("obj",obj)
      Object.keys(obj).forEach((key) => {
        if(obj[key].id==commentId){
          let reactObj={userId:userId,like:react}
          console.log("reactObj",reactObj)
          if(obj[key].hasOwnProperty("userReact")){
            console.log("reactObj in",obj[key].userReact)
            let existReact =Object.keys(obj[key].userReact).filter((userReactKey:any)=>obj[key].userReact[userReactKey].userId==userId)
            console.log("existReact",existReact.length,existReact)
            if(existReact.length > 0){

            //  this.db.list(`/comments/${caseId}/${key}/userReact`).valueChanges().subscribe(e=>{
            //     console.log("react",e)
            //       e.child(existReact[0]).update(reactObj).then((res)=>{
            //     console.log("Data updated",res);
            //   }).catch((err)=>{
            //     console.log(err);
            //   })
            //   });

            // this.db.list(`/comments/${caseId}/${key}/userReact/`+existReact[0]).set("userId",userId)
            // this.db.list(`/comments/${caseId}/${key}/userReact/`+existReact[0]).set("like",react)


              let userRef = this.db.database.ref(`/comments/${caseId}/${key}/userReact`)
              const childref = userRef.child(existReact[0]);
              return childref.set(reactObj)


              // let dbref = this.db.database.ref(`/comments/${caseId}`)
              // console.log("dbref",dbref);
              // console.log("userRef",userRef,existReact);
              // userRef.child('/userReact/'+existReact[0]).set(reactObj).on('value', (data) => {
              //   console.log("Data updated",res);
              // })
            }else{
              return this.db.list(`/comments/${caseId}/${key}/userReact`).push(reactObj)
            }
          }else{
            console.log("reactObj first update")
            return this.db.list(`/comments/${caseId}/${key}/userReact`).push(reactObj)
          }
        
        }
      });
    })
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

