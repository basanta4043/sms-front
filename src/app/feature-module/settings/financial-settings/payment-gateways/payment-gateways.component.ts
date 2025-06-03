import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
  selector: 'app-payment-gateways',
  templateUrl: './payment-gateways.component.html',
  styleUrl: './payment-gateways.component.scss'
})
export class PaymentGatewaysComponent {
  public routes = routes;
}
