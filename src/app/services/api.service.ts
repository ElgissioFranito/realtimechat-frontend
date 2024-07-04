import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly urlBase = environment.urlRoot;
  private readonly apiUrl = this.urlBase + 'api/';
  public headers = new HttpHeaders;

  constructor(public http: HttpClient) {}

  login (data : any) : Observable<any> {
    return this.http.post(this.apiUrl + 'login', data);
  }

  sendMessage (data:any) : Observable<any> {
    return this.http.post(this.apiUrl + 'sendMessage', data);
  }

}
