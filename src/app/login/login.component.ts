import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm : FormGroup = new FormGroup({
    user_name : new FormGroup(''),
    user_password : new FormGroup(''),
  });

  constructor (private apiService : ApiService) {}

  onLogin(){
    this.apiService.login(this.loginForm.value).subscribe({
      next : (data:any) => {
        console.log(data);
      }
    })
  }
}
