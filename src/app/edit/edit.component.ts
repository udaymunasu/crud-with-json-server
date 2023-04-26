import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {
  addEmplyoee: any;
  id: any;

  constructor(
    public employeeService: EmployeeService,
    private fb: FormBuilder,
    private url: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id=this.url.snapshot.params['id'];
    console.log(this.id)
    // this.employeeService.editEmployee()
  }

  onSubmit(){
    this.employeeService.postRegistration(this.addEmplyoee.value).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/list-emp'])
    })
  }
}
