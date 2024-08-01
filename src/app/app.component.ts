import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SharedService } from './services/shared.service';
import { EchoService } from './services/echo.service';
import { LaravelApiService } from './services/laravelApi.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, LoginComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'realtimechat-frontend';
  messages: any[] = [];

  constructor(public sharedService: SharedService, 
    private echoService: EchoService, 
    private apiService: LaravelApiService, 
    private router: Router) { }

  ngOnInit(): void {

    this.autoConnect();

  }

  autoConnect() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })

      this.echoService.listen('chat', 'MessageSent', (data: any) => {
        console.log(data.message);
        this.messages.push(data.message);
      });

      this.sharedService.isLogin = true;
      
    }
  }

}
