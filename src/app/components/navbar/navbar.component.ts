import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: (_) => {
        this.toastr.info('Has salido correctamente', 'LogOut');
        localStorage.clear();
        this.authService.isLoggedIn.next(false);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
