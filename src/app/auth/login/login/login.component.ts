import {Component, OnInit} from '@angular/core';
import {routes} from '../../../shared/routes/routes';
import {Router} from '@angular/router';
import {LoginService} from "./login.component.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent implements OnInit{
  public routes = routes;

  constructor(private router: Router, private loginService: LoginService,private toastr: ToastrService) {
  }

  public login(email: string, password: string) {
    this.loginService.login({username: email, password: password}).subscribe({
      next: (res) => {
        // Save token, redirect, etc.
        this.router.navigate([routes.adminDashboard]).then(r => localStorage.setItem("token", res.token));
      },
      error: (err) => {
        console.error('Login failed', err);
        this.toastr.error(err.error?.message || 'Login failed', 'Error');
      }
    });

  }

  public password: boolean[] = [false];

  public togglePassword(index: any) {
    this.password[index] = !this.password[index]
  }

  ngOnInit(): void {
    localStorage.clear();
  }
}
