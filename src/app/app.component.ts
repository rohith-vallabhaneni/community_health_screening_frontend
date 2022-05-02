import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'community-health-screening';
  constructor(private router: Router) {
  }

  get displayOperations() {
    return localStorage.length > 0;
  }

  get userInfo() {

    return { email: localStorage.getItem('email'), role: localStorage.getItem('role') !== 'doctor' ? 'patient' : 'doctor' }
  }

  get isRootRoute() {
    return this.router.url === '/';
  }

  get isLoginRoute() {
    return this.router.url === '/login';
  }



  onLogoutClick() {
    localStorage.clear();
    this.router.navigateByUrl('')
  }
}
