import {Component, OnInit, Renderer2} from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../../../../shared/data/data.service';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';
import { FeesRecord, apiResultFormat } from '../../../../shared/model/pages.model';
import {StudentService} from "../student.component.service";

@Component({
    selector: 'app-student-fees',
    templateUrl: './student-fees.component.html',
    styleUrl: './student-fees.component.scss',
    standalone: false
})
export class StudentFeesComponent implements OnInit {


// Siblings
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

  bsValue = new Date();
  initChecked = false;
  public pageSize = 10;
  public tableData: Array<FeesRecord> = [];
  public tableDataCopy: Array<FeesRecord> = [];
  public actualData: Array<FeesRecord> = [];
  public currentPage = 1;

  // pagination variables

  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<FeesRecord>;
  public searchDataValue = '';
  constructor(
    private renderer: Renderer2,
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private studentService:StudentService,
    private route: ActivatedRoute
  ) {

    this.data.getFeesRecord().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.studentFees) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;

        }
      });
    });

  }

  public handleApplyClick = () => {
    const modalElements = document.getElementsByClassName('drop-width');
    if (modalElements.length > 0) {
      for (let i = 0; i < modalElements.length; i++) {
        const modalElement = modalElements[i];
        this.renderer.removeClass(modalElement, 'show');
      }
    }
  };

  private getTableData(pageOption: pageSelection): void {
    this.data.getFeesRecord().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: FeesRecord, index: number) => {
        const serialNumber = index + 1;
        console.log(res,11);

        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);

        }
      });
      this.dataSource = new MatTableDataSource<FeesRecord>(this.actualData);
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
  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
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
