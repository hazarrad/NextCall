import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './auth/AdminGuard';
import { CoacheeGuard } from './auth/CoacheeGuard';
import { CoachGuard } from './auth/CoachGuard';
import { ContainerComponent } from './components/container/container.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavigationComponent } from './main-layout/navigation/navigation.component';
import { AccessManagementComponent } from './modules/access-management/access-management.component';
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { FaqComponent } from './modules/faq/faq.component';
import { LandingAdminComponent } from './modules/landing-admin/landing-admin.component';
import { LandingCoachComponent } from './modules/landing-coach/landing-coach.component';
import { LandingCoacheeComponent } from './modules/landing-coachee/landing-coachee.component';
import { loginComponent } from './modules/login/login/login.component';
import { ProgramDescriptionComponent } from './modules/program-description/program-description.component';



const routes: Routes = [
  {
    path: 'Admin',
    component: ContainerComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: LandingAdminComponent },
          { path: 'Home', component: LandingAdminComponent },
          { path: 'Config', component: ConfigurationComponent },
          { path: 'Desc', component: ProgramDescriptionComponent },
          { path: 'access',component: AccessManagementComponent},
          // { path: 'Coachee',component: LandingCoacheeComponent},
          { path: 'QnA', component: FaqComponent },
          { path: 'login', component: loginComponent },

        ]
      }
    ]
  },

  {
    path: 'Coachee',
    component: ContainerComponent,
    canActivate: [CoacheeGuard],
    children: [
      {
        path: '' ,
        children: [
          { path: '', component: LandingCoacheeComponent },
          // { path: 'Coach',component: LandingCoachComponent},
          { path: 'Home',component: LandingCoacheeComponent},
          { path: 'Desc', component: ProgramDescriptionComponent },
          { path: 'QnA', component: FaqComponent },
          { path: 'login', component: loginComponent }

        ]
      }
    ]
  },
  {
    path: 'Coach',
    component: ContainerComponent,
    canActivate: [CoachGuard],
    children: [
      {
        path: '',
        children: [
          { path: '', component: LandingCoachComponent },
          // { path: 'login', component: login },
          { path: 'Home',component: LandingCoachComponent},
          { path: 'Desc', component: ProgramDescriptionComponent },
          { path: 'QnA', component: FaqComponent },
          { path: 'login', component: loginComponent },

        ]
      }
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: loginComponent },
  { path: 'Page-Not-Found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/Page-Not-Found', pathMatch: 'full' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
