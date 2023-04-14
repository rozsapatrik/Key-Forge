import { Component, Input } from '@angular/core';
import { User } from '../shared/user.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() registeredUserInput?: User;
}
