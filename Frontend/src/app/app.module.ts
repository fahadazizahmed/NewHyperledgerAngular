import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import {ValidateService} from './services/validate.service';
import {MapService} from './services/map.service';
import {AuthService} from './services/auth.service';
import {DataService} from './services/data.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { DataTablesModule } from 'angular-datatables';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UserModelComponent } from './components/user-model/user-model.component';
import { VerifyComponent } from './components/verify/verify.component';



import { ForgetComponent } from './components/forget/forget.component';
import { ResetComponent } from './components/reset/reset.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { UserPanelNavbarComponent } from './components/user-panel-navbar/user-panel-navbar.component';
import { UserEnergyMixComponent } from './components/user-energy-mix/user-energy-mix.component';
import { UserPowerStorageComponent } from './components/user-power-storage/user-power-storage.component';
import { UserTradeComponent } from './components/user-trade/user-trade.component';
import { MapComponent } from './components/googlemap/map.component';
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes =  [
  {path:'', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'forget', component: ForgetComponent},
  {path:'verify/:token', component: VerifyComponent},
  {path:'reset/:token', component: ResetComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AdminGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'userPanel', component: UserpanelComponent, canActivate:[AuthGuard]},
    {path:'map', component: MapComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    RegisterComponent,
    UserModelComponent,
    VerifyComponent,
    ForgetComponent,
    ResetComponent,
    UserpanelComponent,
    UserPanelNavbarComponent,
    UserEnergyMixComponent,
    UserPowerStorageComponent,
    UserTradeComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),

    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrfeH8C0hIv6ZfD93KzaeuAz0aroFt2Y0',
      libraries: ['geometry']
    })
  ],
  providers: [ValidateService,AuthService,
              DataService,MapService,
              AuthGuard,NgbActiveModal, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
