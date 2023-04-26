import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { SortingInterface } from '../list/list.component';

@Injectable()
export class EmployeeService {
  readonly baseURL = 'http://localhost:3000/employees';


  // openSnackBar(message: string, action: string = 'ok') {
  //   this._snackBar.open(message, action, {
  //     duration: 1000,
  //     verticalPosition: 'top',
  //   });
  // }

  private baseUrl: string = "http://localhost:3000/employees";

  constructor(private http: HttpClient) { }

  postRegistration(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
  }

  getRegisteredUser() {
    return this.http.get<User[]>(`http://localhost:3000/employees`)
  }

  updateRegisterUser(registerObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)
  }

  deleteRegistered(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }

  getRegisteredUserId(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

}
