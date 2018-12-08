import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { AuthService, User } from './../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  authState$: Observable<User | null>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
    this.authState$ = this.authService.authState;
  }

  getAvatarURL(nick: string): string {
    return `https://steemitimages.com/u/${nick}/avatar/small`;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService
      .logout()
      .pipe(first())
      .subscribe();
  }
}
