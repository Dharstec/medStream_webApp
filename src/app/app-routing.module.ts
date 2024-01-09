import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './services/core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  // { path: '', redirectTo: 'liveCases/list', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => (import('./auth/auth.module')).then((m) => m.AuthModule)},
  { path: 'user/home', loadChildren: () => (import('./home/home.module')).then((m) => m.HomeModule) },
  { path: 'user/all-cases', loadChildren: () => (import('./components/all-cases/all-cases.module')).then((m) => m.AllCasesModule),canActivate:[AuthGuard] },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Default route


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
