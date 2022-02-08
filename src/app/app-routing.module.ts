import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TrainerPageComponent } from './components/trainer-page/trainer-page.component';
import { CataloguePageComponent } from './components/catalogue-page/catalogue-page.component';
import { AuthGuard } from './guards/auth.guard';

//Routes object. Contains all the paths, components and if there is a need for a guard for a page. There will be a canActivate function.
const routes: Routes = [
{path:'', redirectTo:'login', pathMatch:'full'},
{path: 'login', component: LoginPageComponent ,pathMatch:'full'},
{path: 'catalogue', component: CataloguePageComponent, canActivate: [AuthGuard]},
{path: 'trainer', component: TrainerPageComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],})
export class AppRoutingModule { }
