import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SteemConnectConfig } from './auth/config';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: AppComponent
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot(),
    AuthModule.forRoot(environment.steemConnectConfig as SteemConnectConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
