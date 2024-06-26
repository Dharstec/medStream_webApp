import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './services/core/auth.guard';
import { ExpertsComponent } from './components/experts/experts.component';
import { SingleCaseComponent } from './components/all-cases/single-case/single-case.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'user/landing', pathMatch: 'full' },
  // { path: '', redirectTo: 'liveCases/list', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => (import('./auth/auth.module')).then((m) => m.AuthModule)},
  { path: 'user/landing', loadChildren: () => (import('./home/home.module')).then((m) => m.HomeModule) },
  { path: 'user/schedule', loadChildren: () => (import('./components/schedule/schedule.module')).then((m) => m.ScheduleModule)},
  { path: 'user/all-cases', loadChildren: () => (import('./components/all-cases/all-cases.module')).then((m) => m.AllCasesModule),canActivate:[AuthGuard] },
  {path: 'user/all-cases/single-case/:id',component: SingleCaseComponent},
  // { path: 'user/landing' , component:HomeComponent },
  { path: 'user/operators', loadChildren: () => (import('./components/experts/experts.module')).then((m) => m.ExpertsComponentModule) },
  // { path: 'user/operators', component:ExpertsComponent },
  { path: 'user/institution', loadChildren: () => (import('./components/institution/institution.module')).then((m) => m.InstitutionModule)},
  { path: 'chat', component:ChatComponent }

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Default route


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
