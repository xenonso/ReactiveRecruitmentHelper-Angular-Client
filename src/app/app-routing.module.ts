import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuardService as AuthenticationFilter } from './services/authentication/route-guards/authentication-guard-service/authentication-guard.service';
import { AnonymousGuardService as AnonymousFilter } from './services/authentication/route-guards/anonymous-guard-service/anonymous-guard.service';
import { RoleGuardService as RoleFilter } from './services/authentication/route-guards/role-guard-service/role-guard.service';

import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationSuccessComponent } from './application/application-success/application-success.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { AccountComponent } from './account/account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserCreateComponent } from './users/user-create.component';
import { UsersCreateSuccessComponent } from './users/user-create-success/user-create-success.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'application', 
    component: ApplicationComponent,
    canActivate: [AnonymousFilter] 
  },
  { 
    path: 'application/success', 
    component: ApplicationSuccessComponent,
    canActivate: [AnonymousFilter] 
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousFilter]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AnonymousFilter]
  },
  {
    path: 'users',
    component: UserCreateComponent,
    canActivate: [RoleFilter],
    data: {expectedRole: 'ADMIN'}
  },
  {
    path: 'users/success',
    component: UsersCreateSuccessComponent,
    canActivate: [RoleFilter],
    data: {expectedRole: 'ADMIN'}
  },
  {
    path: 'candidates',
    component: CandidatesComponent,
    canActivate: [RoleFilter],
    data: {expectedRole: 'RECRUITER'}
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthenticationFilter]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
