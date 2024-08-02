import { Component, OnInit, signal } from '@angular/core';
import { LaravelApiService } from '../services/laravelApi.service';
import { SharedService } from '../services/shared.service';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { NgClass } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatDialogComponent, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent{

  isVisibleChat = signal(true);

  toggleChat() {
    this.isVisibleChat.set(!this.isVisibleChat());
  }

  onCloseChat(e: boolean): void {
    if (e === true) {
      this.toggleChat()
    }
  }
}
