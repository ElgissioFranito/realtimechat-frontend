import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', function() {
      console.log('Connected');
    });
  }



  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }
}
