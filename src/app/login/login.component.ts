import { Component, Output } from '@angular/core';
import { User } from '../shared/user.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loggedUserOutput?: User;
}
