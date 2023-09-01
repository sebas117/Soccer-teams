import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('f') signupForm: NgForm;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  user: User = {
    username: '',
    password: '',
  };

  onSubmit() {
    this.user = this.signupForm.value;

    this.authService.login(this.user).subscribe({
      next: (_) => {
        this.toastr.success('Te has autenticado correctamente', 'LogIn');
        localStorage.setItem('isLogged', 'true');
        this.authService.isLoggedIn.next(true);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
