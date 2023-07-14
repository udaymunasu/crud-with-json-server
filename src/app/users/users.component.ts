import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { Employee } from '../services/employee.model';
import { EmployeeService } from '../services/employee.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('slideFromRight', [
      transition(':enter', [
        style({ transform: ' translateX(100%)'}),
        animate('0.5s', style({  transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        animate('0.5s', style({  transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('slideFromLeft', [
      transition(':enter', [
        style({ transform: ' translateX(-100%)'}),
        animate('0.5s', style({  transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        animate('0.5s', style({  transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {
  userId!: number;
  userDetails!: User;

  constructor(
   
    private activatedRoute: ActivatedRoute, private api: EmployeeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    })
  }

  fetchUserDetails(userId: number) {
    this.api.getRegisteredUserId(userId)
      .subscribe({
        next: (res) => {
          this.userDetails = res;

          console.log("this.userDetails", this.userDetails)
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  // resetForm(form?: NgForm) {
  //   if (form) form.reset();
  //   this.employeeService.selectedEmployee = {
  //     _id: '',
  //     name: '',
  //     position: '',
  //     office: '',
  //     salary: 0,
  //   };
  // }

  // loadEmployee() {
  //   this.employeeService.ListEmployee().subscribe((data: any) => {
  //     // console.log(data)
  //     this.employees = data;
  //   });
  // }

  // refreshEmployeeList() {
  //   this.employeeService.ListEmployee().subscribe((res) => {
  //     this.employeeService.employees = res as Employee[];
  //   });
  // }

  // onEdit(emp: Employee) {
  //   this.employeeService.selectedEmployee = emp;
  // }

  // delEmployee(data: any) {
  //   this.employeeService.deleteEmployee(data._id).subscribe((data) => {
  //     console.log(data)
  //   });
  // }
}
