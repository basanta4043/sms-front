import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, pageSelection, studentlist } from '../../../../shared/model/pages.model';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { Sort } from '@angular/material/sort';
import {StudentService} from "../student.component.service";

@Component({
    selector: 'app-students-list',
    templateUrl: './students-list.component.html',
    styleUrl: './students-list.component.scss',
    standalone: false
})
export class StudentsListComponent {
  initChecked = false;
  public pageSize = 10;
  public tableData: Array<studentlist> = [];
  public tableDataCopy: Array<studentlist> = [];
  public actualData: Array<studentlist> = [];
  public routes = routes;
  public currentPage = 1;
  // pagination variables
  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<studentlist>;
  public searchDataValue = '';

  constructor(
    private data: DataService,
    private studentService: StudentService,
    private router: Router,
    private pagination: PaginationService
  ) {
    // this.data.getStudent().subscribe((apiRes: apiResultFormat) => {
    //
    //   this.actualData = apiRes.data;
    //
    // });

    this.studentService.fetchStudentList().subscribe((res)=>{
      console.log(res);
      res.forEach((student: { admissionNumber: any; rollNumber: any; name: any; className: any; section: any; gender: any; status: any; dateOfJoin: any; dateOfBirth: any; }) => {
        const std = {
          sNo: student.admissionNumber,
          id: student.admissionNumber,
          promotion: "",
          result: "",
          AdmissionNo: student.admissionNumber,
          isSelected: false,
          RollNo: student.rollNumber,
          name: student.name,
          class: student.className,
          section: student.section,
          gender: student.gender,
          status: student.status,
          DateofJoin: student.dateOfJoin,
          DOB: student.dateOfBirth,
          imgSrc: "assets/img/students/student-01.jpg"
        };
        this.actualData.push(std);
        this.tableData.push(std)
        this.tableDataCopy.push(std)
      })

      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.studentList) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {

      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = this.actualData.length
      this.actualData.map((res: studentlist, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      this.dataSource = new MatTableDataSource<studentlist>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    // this.getTableData();
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }
  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }

}
