import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService, User } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authState: Observable<User | null>;

  constructor(private auth: AuthService) {
    this.authState = this.auth.authState;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth
      .logout()
      .pipe(first())
      .subscribe();
  }
}
