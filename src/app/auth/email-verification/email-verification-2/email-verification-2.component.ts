import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-email-verification-2',
    templateUrl: './email-verification-2.component.html',
    styleUrl: './email-verification-2.component.scss',
    standalone: false
})
export class EmailVerification2Component {
  public routes = routes;
  constructor(private router: Router) {}

  public navigate() {
    this.router.navigate([routes.login2]);
  }
}
