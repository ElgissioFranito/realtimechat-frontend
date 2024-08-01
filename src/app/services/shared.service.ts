import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isLogin = false;
  user? : any;

  constructor() { }
}
