import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPointComponent} from './add-point/add-point.component';
import {ActivateCardComponent} from './activate-card/activate-card.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './login/login.component';
import {SpendPointComponent} from './spend-point/spend-point.component';
import {ViewPointsComponent} from './view-points/view-points.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'addPoints', component: AddPointComponent, canActivate: [AuthGuard]},
  {path: 'spendPoints', component: SpendPointComponent, canActivate: [AuthGuard]},
  {path: 'activateCard', component: ActivateCardComponent, canActivate: [AuthGuard]},
  {path: 'viewPoint', component: ViewPointsComponent, canActivate: [AuthGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
