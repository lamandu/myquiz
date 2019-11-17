import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Items} from '../models/Items';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(public httpClient: HttpClient) { }

  getQuestoes(): Observable<Array<Items>> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      /*  'Access-Control-Allow-Origin': '*',*/
        'x-api-key': environment.api_key
      });

     const options = {
      headers
    };
     // endpoint do backend serverless do AWS, restringi a 1000 requisições por dia.
    return this.httpClient.get<Array<Items>>(environment.aws_endpoint + environment.curso,  options);
  }
}
