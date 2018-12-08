import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';
import { CookieModule } from 'ngx-cookie';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SteemConnectConfig } from './auth/config';
import { ChartComponent } from './election/chart/chart.component';
import { ElectionComponent } from './election/election.component';
import { PoolComponent } from './election/pool/pool.component';
import { ResultModalComponent } from './election/pool/result-modal.component';
import { LayoutComponent } from './layout/layout.component';
import { DataChartsComponent } from './data-charts/data-charts.component';

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
  declarations: [
    AppComponent,
    LayoutComponent,
    ElectionComponent,
    PoolComponent,
    ChartComponent,
    ResultModalComponent,
    DataChartsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatRadioModule,
    RouterModule.forRoot(appRoutes),
    CookieModule.forRoot(),
    GoogleChartsModule.forRoot(),
    AuthModule.forRoot(environment.steemConnectConfig as SteemConnectConfig),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [ResultModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
