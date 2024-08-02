import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NestApiService {

  private readonly urlRoot = 'http://localhost:3000';

  http = inject(HttpClient);

  getDiscussionMessages(id : number) : Observable<any> {
    const url_discussion_messages = this.urlRoot + '/discussion/' + id;
    return this.http.get(url_discussion_messages);
  }

  sendMessage(id : string, data : any) : Observable<any> {
    const url_send_messages = this.urlRoot + '/message';
    const dataToSend = {
      discussion_id: 1,
      user_id: parseInt(id),
      message_content: data
    }
    return this.http.post(url_send_messages, dataToSend);
  }
}
