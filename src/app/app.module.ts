import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SteemConnectConfig } from './auth/config';
import { LayoutComponent } from './layout/layout.component';
import { ElectionComponent } from './election/election.component';
import { MatCardModule } from '@angular/material/card';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ElectionComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ElectionComponent
  }
];

@NgModule({
  declarations: [AppComponent, LayoutComponent, ElectionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot(),
    AuthModule.forRoot(environment.steemConnectConfig as SteemConnectConfig),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
