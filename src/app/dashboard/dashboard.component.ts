import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: EmployeeService) { }

  users;
  userLength

  ngOnInit(): void {
  }

  getUsers() {
    this.apiService.getRegisteredUser().subscribe({
      next: (res) => {
        this.users = res;
        this.userLength = this.users.length;
        console.log("this.userLength", this.userLength)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
