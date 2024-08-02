import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  // public echo: Echo;

  // constructor() {
  //   this.echo = new Echo({
  //     broadcaster: 'socket.io',
  //     host: 'http://localhost:6001',
  //     client: io
  //   });
  // }
  // listen(channel: string, event: string, callback: Function): void {
  //   this.echo.channel(channel).listen(event, (data: any) => {
  //     callback(data);
  //   });
  // }

  // disconnect(): void {
  //   this.echo.disconnect();
  // }
}
