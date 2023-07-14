import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { EmployeeService } from '../services/employee.service';
import * as XLSX from 'xlsx';
import { FormBuilder } from '@angular/forms';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-community';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, transition, style, animate } from '@angular/animations';

export interface SortingInterface {
  firstName: string;
  package: 'asc' | 'desc';
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('slideFromLeft', [
      transition(':enter', [
        style({ transform: ' translateX(-100%)'}),
        animate('0.5s', style({  transform: 'translateX(0)'}))
      ])
    ])
  ]
})
export class ListComponent implements OnInit {
  fileName = 'ExcelSheet.xlsx';

  public users!: User[];
  dataSource!: MatTableDataSource<User>;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'bmiResult',
    'gender',
    'package',
    'enquiryDate',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public rowData$!: User[];

  userLength


  searchValue: string = '';
  searchForm = this.fb.group({
    searchValue: '',
  });

  constructor(
    private apiService: EmployeeService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getRegisteredUser().subscribe({
      next: (res) => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.userLength = this.users.length;
        console.log("this.userLength", this.userLength)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteUser(id: number) {
    this.apiService.deleteRegistered(id).subscribe({
      next: (res) => {
        this.getUsers();
      },
      error: (err) => {
        alert('erroe');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
