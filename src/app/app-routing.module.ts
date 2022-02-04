import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TrainerPageComponent } from './components/trainer-page/trainer-page.component';
import { CataloguePageComponent } from './components/catalogue-page/catalogue-page.component';

const routes: Routes = [
{path:'', redirectTo:'login', pathMatch:'full'},
{path: 'login', component: LoginPageComponent, pathMatch:'full'},
{path: 'trainer', component: TrainerPageComponent},
{path: 'catalogue', component: CataloguePageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
