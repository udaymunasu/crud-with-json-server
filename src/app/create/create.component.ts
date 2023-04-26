import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { User } from '../models/user';
import { Employee } from '../services/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  selectedGender!: string;
  genders: string[] = ["Male", "Female"];
  packages: string[] = ["Monthly", "Quarterly", "Yearly"];
  importantList: string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ]

  registrationForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;


  constructor(public employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router,) {

      this.registrationForm = this.fb.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        mobile: [''],
        weight: [''],
        height: [''],
        bmi: [''],
        bmiResult: [''],
        gender: [''],
        requireTrainer: [''],
        package: [''],
        important: [''],
        haveGymBefore: [''],
        enquiryDate: ['']
      });
  }

  ngOnInit(): void {
    this.refreshEmployeeList();
    // this.empForm.patchValue();;
    this.registrationForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });
  }

  submit(){
    if(this.registrationForm.valid) {
      this.employeeService.postRegistration(this.registrationForm.value).subscribe({
        next: (val: any) =>{
          alert('employee added succesfully');

        },
        error: (err: any) => {
          console.log(err);
        }
      })

    }
  }

  calculateBmi(value: number) {
    const weight = this.registrationForm.value.weight; // weight in kilograms
    const height = value; // height in meters
    const bmi = weight / (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registrationForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registrationForm.controls['bmiResult'].patchValue("Overweight");
        break;

      default:
        this.registrationForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }

  fillFormToUpdate(user: User) {
    this.registrationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate
    })
  }

  update(){}


  refreshEmployeeList() {
    
  }



}
