import { AfterContentChecked, AfterViewChecked, ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { NestApiService } from '../services/nest-api.service';
import { map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WebSocketService } from '../services/web-socket.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat-dialog',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './chat-dialog.component.html',
  styleUrl: './chat-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDialogComponent implements OnInit, AfterViewChecked {

  @Output() closeChat = new EventEmitter<boolean>();

  apiService = inject(NestApiService);
  destroyRef = inject(DestroyRef);
  webSocket = inject(WebSocketService);
  messages = signal([] as any);

  ngOnInit() {

    this.webSocket.on('rakoto').subscribe((data) => {
      setTimeout(() => {
        this.getDiscussionMessages();
      }, 10);
      console.log(data);
      
    });

    this.getDiscussionMessages();

  }

  ngAfterViewChecked(): void {
    const chatBox = document.querySelector('#chat-box') as HTMLDivElement;
    chatBox.scrollTo({ top: 1000, behavior: 'smooth' });
  }

  getDiscussionMessages() {
    this.apiService.getDiscussionMessages(1).pipe(
      tap((data: any) => {
        this.messages.set(data);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  onCloseChat() {
    this.closeChat.emit(true);
  }

  onSendMessage() {
    const input = document.querySelector('#message-input') as HTMLInputElement;
    const messageInInput = input.value;
    const id = messageInInput.split('_')[0];
    const message = messageInInput.split('_')[1];


    if (!messageInInput || ((id != "1") && (id != "2")) || !message) {
      return;
    }

    this.webSocket.emit('message', 'Message sended');

    this.apiService.sendMessage(id, message).pipe(
      tap((data: any) => {
        console.log(data);
        this.getDiscussionMessages();
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    input.value = '';
  }
}
