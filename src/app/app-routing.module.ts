import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'signin', component: SignInComponent,
  },
  { path : '', redirectTo: '/signin', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
