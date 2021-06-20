import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './main-layout/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { LandingAdminComponent } from './modules/landing-admin/landing-admin.component';
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { AccessManagementComponent } from './modules/access-management/access-management.component';
import { LandingCoachComponent } from './modules/landing-coach/landing-coach.component';
import { LandingCoacheeComponent } from './modules/landing-coachee/landing-coachee.component';
import { FaqComponent } from './modules/faq/faq.component';
import { ProgramDescriptionComponent } from './modules/program-description/program-description.component';
import { RouterModule } from '@angular/router';
import { loginComponent } from './modules/login/login/login.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    HeaderComponent,
    ContainerComponent,
    PageNotFoundComponent,
    LandingAdminComponent,
    ConfigurationComponent,
    AccessManagementComponent,
    LandingCoachComponent,
    LandingCoacheeComponent,
    FaqComponent,
    ProgramDescriptionComponent,
    loginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    AvatarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
