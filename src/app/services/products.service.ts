import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiManager } from './api';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  /**
   * Common Get Data POST
   * @param apiUrl
   * @param params
   * @returns {Observable<any>}
   */
   ListData(apiUrl: any,params: any) {
    return this.http.get(apiUrl,params);

  }
  /**
   * Common Get Data POST
   * @param apiUrl
   * @param params
   * @returns {Observable<any>}
   */
   addData(apiUrl: any,params: any) {
    return this.http.post(apiUrl,params);

  }
}
