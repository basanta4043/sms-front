import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';


@Component({
  selector: 'app-tables-basic',
  templateUrl: './tables-basic.component.html',
  styleUrls: ['./tables-basic.component.scss'],
})
export class TablesBasicComponent {
  public routes = routes;
}
