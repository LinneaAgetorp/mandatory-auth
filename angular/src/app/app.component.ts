import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService) {
    if(this.authService.authenticated) {
      this.username = this.authService.user
    }
  }
  username: any;

  login(credentials) {
    this.authService.login({credentials})
    this.username = this.authService.user

  }

  logout() {
    this.authService.logout()
    this.username = this.authService.user


  }

  testApi() {
    this.authService.getResource('friends')
  }
}
