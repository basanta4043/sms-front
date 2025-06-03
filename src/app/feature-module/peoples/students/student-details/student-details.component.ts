import {Component, OnInit} from '@angular/core';
import {routes} from '../../../../shared/routes/routes';
import {StudentService} from "../student.component.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrl: './student-details.component.scss',
    standalone: false
})
export class StudentDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private studentService: StudentService) {
  }

  public routes = routes;
  parents = [
    {
      name: '',
      role: '',
      phone: '',
      email: '',
      image: 'assets/img/parents/parent-13.jpg'
    }
  ];

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
      this.parents = [
        {
          name: 'Netra Narayan Regmi',
          role: 'Father',
          phone: '9846012735',
          email: 'netra@example.com',
          image: 'assets/img/parents/parent-13.jpg'
        },
        {
          name: 'Bindu Devi Regmi',
          role: 'Mother',
          phone: '984601235',
          email: 'mother@example.com',
          image: 'assets/img/parents/parent-14.jpg'
        },
        {
          name: 'Netra Narayan Regmi',
          role: 'Guardian (Father)',
          phone: '984601235',
          email: 'netra@example.com',
          image: 'assets/img/parents/parent-13.jpg'
        }
      ];

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


