import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLogged: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((res) => {
      this.isLogged = res;
      this.isLogged
        ? this.router.navigate(['/teams'])
        : this.router.navigate(['/login']);
    });
  }
}
