import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { SteemConnectConfig, STEEMCONNECT_CONFIG } from './config';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class AuthModule {
  static forRoot(config: SteemConnectConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: STEEMCONNECT_CONFIG, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    };
  }
}
