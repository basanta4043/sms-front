import {Component, OnInit} from '@angular/core';
import { apiResultFormat, teacherLeaves, pageSelection, studentLeaveAttendance } from '../../../../shared/model/pages.model';
import { routes } from '../../../../shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { DataService } from '../../../../shared/data/data.service';
import {StudentService} from "../student.component.service";

@Component({
    selector: 'app-student-leaves',
    templateUrl: './student-leaves.component.html',
    styleUrl: './student-leaves.component.scss',
    standalone: false
})
export class StudentLeavesComponent implements OnInit {
  siblings = [
    {
      name: '',
      grade: '',
      image: 'assets/img/students/student-06.jpg'
    }
  ];
  status = '';
  name = '';
  admissionNumber = '';
  rollNo = '';
  gender = '';
  dob = '';
  bloodGroup = "";
  house = '';
  religion = '';
  cast = '';
  category = '';
  motherTongue = '';
  language1 = '';
  language2 = '';
  phoneNumber = '';
  email = '';
  hostelName = '';
  roomNumber = '';
  busRoute = '';
  busNumber = '';
  pickupPoint = '';
  previousSchoolName = '';
  previousSchoolAddress = '';
  currentAddress = '';
  permanentAddress = '';
  bankName = '';
  branchName = '';
  ifscNumber = '';
  otherInfo = '';
  public routes = routes;
  // pagination variables
  public tableData: Array<teacherLeaves> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  dataSource!: MatTableDataSource<teacherLeaves>;
  public searchDataValue = '';
  public tableDataCopy: Array<teacherLeaves> = [];
  public actualData: Array<teacherLeaves> = [];
  //** pagination variables
  // pagination variables
  public tableData2: Array<studentLeaveAttendance> = [];
  public pageSize2 = 10;
  public serialNumberArray2: Array<number> = [];
  public totalData2 = 0;
  dataSource2!: MatTableDataSource<studentLeaveAttendance>;
  public searchDataValue2 = '';
  public tableDataCopy2: Array<studentLeaveAttendance> = [];
  public actualData2: Array<studentLeaveAttendance> = [];
  //** pagination variables
  initChecked = false;

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private route: ActivatedRoute,
    private studentService:StudentService
  ) {
    this.data.getTeacherLeaves().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.studentLeaves) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
    this.data.getstudentLeaveAttendance().subscribe((apiRes: apiResultFormat) => {
      this.actualData2 = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.studentLeaves) {
          this.getTableData2({ skip: res.skip, limit: res.limit });
          this.pageSize2 = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getTeacherLeaves().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: teacherLeaves, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<teacherLeaves>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }
  private getTableData2(pageOption: pageSelection): void {
    this.data.getstudentLeaveAttendance().subscribe((apiRes: apiResultFormat) => {
      this.tableData2 = [];
      this.tableDataCopy2 = [];
      this.serialNumberArray2 = [];
      this.totalData2 = apiRes.totalData;
      apiRes.data.map((res: studentLeaveAttendance, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.key = serialNumber;
          this.tableData2.push(res);
          this.serialNumberArray2.push(serialNumber);
          this.tableDataCopy2.push(res);
        }
      });
      this.dataSource2 = new MatTableDataSource<studentLeaveAttendance>(this.actualData2);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
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
  public sortData2(sort: Sort) {
    const data = this.tableData2.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData2 = data;
    } else {
      this.tableData2 = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }
  public searchData2(value: string): void {
    if (value == '') {
      this.tableData2 = this.tableDataCopy2;
    } else {
      this.dataSource2.filter = value.trim().toLowerCase();
      this.tableData2 = this.dataSource2.filteredData;
    }
  }

  ngOnInit(): void {
    const admissionNo = this.route.snapshot.paramMap.get('admissionNo');
    console.log(admissionNo);
    this.studentService.fetchStudentDetail(admissionNo ?? "123").subscribe((response => {
      console.log(response);
      this.status = response.personalInformation.status;
      this.name = `${response.personalInformation.firstName} ${response.personalInformation.lastName}`;
      this.admissionNumber = response.personalInformation.admissionNumber;
      this.rollNo = response.personalInformation.rollNumber; // Overridden, not from API
      this.gender = response.personalInformation.gender;
      this.dob = response.personalInformation.dateOfBirth; // Overridden, not from API
      this.bloodGroup = response.personalInformation.bloodGroup;
      this.house = response.personalInformation.house; // Overridden
      this.religion = response.personalInformation.religion; // Overridden
      this.cast = response.personalInformation.cast; // Overridden
      this.category = response.personalInformation.category; // Overridden
      this.motherTongue = response.personalInformation.motherTongue;
      this.language1 = response.personalInformation.languageKnown?.[0] || '';
      this.language2 = response.personalInformation.languageKnown?.[1] || '';
      this.phoneNumber = response.personalInformation.primaryContactNumber; // Overridden
      this.email = response.personalInformation.emailAddress;

      this.hostelName =response.hostelInformation.hostelName; // Overridden
      this.roomNumber = response.hostelInformation?.roomNumber || '';

      this.busRoute = response.transportInformation.route; // Overridden
      this.busNumber = response.transportInformation.vehicleNumber; // Overridden
      this.pickupPoint = response.transportInformation.pickupPoint; // Overridden

      this.previousSchoolName = response.previousSchoolDetails.schoolName; // Overridden
      this.previousSchoolAddress = response.previousSchoolDetails.address; // Overridden

      this.currentAddress = response.addressInformation.currentAddress; // Overridden
      this.permanentAddress = response.addressInformation.permanentAddress; // Overridden

      this.bankName = response.otherDetails.bankName; // Overridden
      this.branchName = response.otherDetails.branch; // Overridden
      this.ifscNumber = response.otherDetails.ifscNumber; // Overridden
      this.otherInfo = response.otherDetails.otherInformation; // Overridden

// Parents

// Siblings
      this.siblings = [
        {
          name: 'Basanti Regmi',
          grade: 'II, B',
          image: 'assets/img/students/student-06.jpg'
        },
        {
          name: 'Prakash Regmi',
          grade: 'V, A',
          image: 'assets/img/students/student-07.jpg'
        }
      ];
    }));

  }
}
