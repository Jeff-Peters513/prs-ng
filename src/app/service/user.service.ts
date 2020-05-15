import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.class';
import { JsonResponse } from '../model/json-response.class';


const url: string ="http://localhost:4200/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<JsonResponse> {
    return this.http.get(url) as Observable<JsonResponse>;
  }
  get(id:number): Observable<JsonResponse> {
    return this.http.get(url+id) as Observable<JsonResponse>;
  }
  create(movie: User): Observable<JsonResponse> {
    return this.http.post(url, User) as Observable<JsonResponse>;
  }
  edit(movie: User): Observable<JsonResponse> {
    return this.http.put(url, User) as Observable<JsonResponse>;
  }
  delete(id:number): Observable<JsonResponse> {
    return this.http.delete(url+id) as Observable<JsonResponse>;
  }

}
