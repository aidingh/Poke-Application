import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TrainerPageComponent } from './components/trainer-page/trainer-page.component';
import { CataloguePageComponent } from './components/catalogue-page/catalogue-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TrainerPageComponent,
    CataloguePageComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
