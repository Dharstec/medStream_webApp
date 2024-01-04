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
import { AuthGuard } from './services/core/auth.guard';
import { ErrorInterceptor } from './services/core/error-interceptor';
import { JwtInterceptor } from './services/core/jwt-interceptor';
@NgModule({
  declarations: [
    AppComponent,SidenavComponent,  BodyComponent,
    HeadersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AuthModule, BrowserAnimationsModule,MaterialModule,
   SplashScreenModule,HttpClientModule
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
  },],  bootstrap: [AppComponent]
})
export class AppModule { }
