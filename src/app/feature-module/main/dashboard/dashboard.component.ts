import {Component, OnInit} from '@angular/core';
import {routes} from "../../../shared/routes/routes";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {
  }

  public routes = routes;

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      this.router.navigate([routes.login]).then(r => localStorage.clear())

    }
  }

}
