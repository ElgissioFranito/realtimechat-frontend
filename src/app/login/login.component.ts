import { Component } from '@angular/core';
import { LaravelApiService } from '../services/laravelApi.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { HttpHeaders } from '@angular/common/http';
import { EchoService } from '../services/echo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    user_name: new FormControl(''),
    user_password: new FormControl(''),
  });

  constructor(private apiService: LaravelApiService, private sharedService: SharedService, private echoService: EchoService) { }

  onLogin() {
    console.log(this.loginForm.value);

    this.apiService.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.user) {
          const token = localStorage.setItem('token', data.token);
          this.apiService.headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
          })

          this.echoService.listen('chat', 'MessageSent', (data: any) => {
            console.log(data.message);
          });

          this.sharedService.isLogin = true;

          this.apiService.headers = new HttpHeaders({ 'name': data.user.user_name, 'password': data.user.user_password });
          this.sharedService.user = data.user;
          this.sharedService.isLogin = true;
        }
      }
    })
  }
}
