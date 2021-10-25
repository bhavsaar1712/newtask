import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiManager } from './api';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatus = new Subject<boolean>();
  constructor(private http:HttpClient) { }
  /**
   * Common Get Data POST
   * @param apiUrl
   * @param params
   * @returns {Observable<any>}
   */
  login(apiUrl: any,params: any) {
    return this.http.post(apiUrl,params);

  }


}
