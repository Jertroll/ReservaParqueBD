import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
