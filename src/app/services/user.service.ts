import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor( private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(env.apiAddress + '/userDetails')
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(env.apiAddress + './userDetails' +id)
  }

}
