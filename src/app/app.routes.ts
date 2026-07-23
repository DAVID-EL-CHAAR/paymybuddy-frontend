import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { AddFriendComponent } from './features/add-friend/add-friend.component';
import { SendMoneyComponent } from './features/send-money/send-money.component';
import { ProfileComponent } from './features/profile/profile.component';
import { BankAccountsComponent } from './features/bank-accounts/bank-accounts.component';
import { TransfersComponent } from './features/transfers/transfers.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'add-friend', component: AddFriendComponent, canActivate: [authGuard] },
  { path: 'send-money', component: SendMoneyComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'bank-accounts', component: BankAccountsComponent, canActivate: [authGuard] },
  { path: 'transfers', component: TransfersComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];