import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, data: { title: 'Login' } },
      { path: 'signup', component: SignupComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
