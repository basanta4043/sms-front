import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
  selector: 'app-teachers-routine',
  templateUrl: './teachers-routine.component.html',
  styleUrl: './teachers-routine.component.scss'
})
export class TeachersRoutineComponent {
public routes = routes
}
