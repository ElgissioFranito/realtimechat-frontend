import { Component } from '@angular/core';
import { LaravelApiService } from '../services/laravelApi.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  sendMessageForm : FormGroup = new FormGroup({
    user_id : new FormControl(1),
    message : new FormControl(''),
  });

  constructor (private apiService : LaravelApiService, private sharedService : SharedService) {}

  onLogin(){
    console.log(this.sendMessageForm.value);
    
    this.apiService.login(this.sendMessageForm.value).subscribe({
      next : (data:any) => {
        console.log(data);
      }
    })
  }
}
