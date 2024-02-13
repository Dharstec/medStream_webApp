import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BodyComponent } from './body/body.component';
import { HeadersComponent } from './headers/headers.component';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './navbar/sidenav/sidenav.component';
import { SplashScreenModule } from './splash-screen/splash-screen.module';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './services/core/auth.guard';
import { ErrorInterceptor } from './services/core/error-interceptor';
import { JwtInterceptor } from './services/core/jwt-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExpertsComponent } from './components/experts/experts.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DISQUS_SHORTNAME } from 'ngx-disqus';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,SidenavComponent,  BodyComponent,
    HeadersComponent,ExpertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AuthModule, BrowserAnimationsModule,MaterialModule,
   SplashScreenModule,HttpClientModule,FormsModule,FontAwesomeModule,FlexLayoutModule,
   AngularFireModule.initializeApp(environment.firebaseConfig),
   AngularFireAuthModule,
   AngularFireStorageModule,
   AngularFirestoreModule,
   AngularFireDatabaseModule
  ],
  providers: [DatePipe,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
  },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
  },
  {
    provide: DISQUS_SHORTNAME,
    useValue: 'medstream360'
  }
  // schemas: [fa-icon],
],  bootstrap: [AppComponent],

})
export class AppModule { }
