import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';


@Component({
  selector: 'app-ui-spinner',
  templateUrl: './ui-spinner.component.html',
  styleUrl: './ui-spinner.component.scss'
})
export class UiSpinnerComponent {
  public routes = routes;
}
