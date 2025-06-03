import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routes} from '../../../../shared/routes/routes';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

interface data {
  name: string | undefined;
  code: string | undefined;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent implements OnInit {
  public routes = routes;
  studentForm!: FormGroup;
  values: string[] = ['English', 'Spanish'];

  constructor(private router: Router, private fb: FormBuilder) {
  }

  formData: { selectedClass: data | undefined }[] = [];
  values2: string[] = ['Allergy', 'Skin Allergy'];
  values3: string[] = ['Medecine Name'];

  public onSubmit() {
    if (this.studentForm.valid) {
      console.log('Final Form Data:', this.studentForm.value);
      // Submit to server or use for further processing
    } else {
      console.warn('Form is invalid');
    }
    this.router.navigate([routes.invoice]);
  }

  addNewRow() {
    this.formData.push({selectedClass: {name: undefined, code: undefined}});
  }

  removeRow(index: number) {
    this.formData.splice(index, 1);
  }

  ngOnInit() {
    this.studentForm = this.fb.group({
      // Personal Information
      academicYear: [''],
      admissionNumber: [''],
      admissionDate: [''],
      rollNumber: [''],
      status: [''],
      firstName: [''],
      lastName: [''],
      className: [''],
      section: [''],
      gender: [''],
      dateOfBirth: [''],
      bloodGroup: [''],
      house: [''],
      religion: [''],
      category: [''],
      primaryContactNumber: [''],
      emailAddress: [''],
      caste: [''],
      motherTongue: [''],
      languageKnown: [[]],

      // Parent Info
      father: this.fb.group({
        name: [''],
        email: [''],
        phone: [''],
        occupation: ['']
      }),
      mother: this.fb.group({
        name: [''],
        email: [''],
        phone: [''],
        occupation: ['']
      }),

      // Guardian Info
      guardian: this.fb.group({
        name: [''],
        relation: [''],
        phone: [''],
        email: [''],
        occupation: [''],
        address: ['']
      }),

      // Siblings
      siblings: this.fb.array([]),

      // Address
      currentAddress: [''],
      permanentAddress: [''],

      // Transport
      route: [''],
      vehicleNumber: [''],
      pickupPoint: [''],

      // Hostel
      hostelName: [''],
      roomNumber: [''],

      // Documents
      medicalConditionDocument: [null],
      transferCertificate: [null],

      // Medical
      medicalCondition: [''],
      allergies: [[]],
      medications: [[]],

      // Previous School
      previousSchoolName: [''],
      previousSchoolAddress: [''],

      // Other
      bankName: [''],
      branch: [''],
      ifscNumber: [''],
      otherInformation: ['']
    });
  }

  // For dynamic siblings array
  get siblings(): FormArray {
    return this.studentForm.get('siblings') as FormArray;
  }

  addSibling() {
    const siblingGroup = this.fb.group({
      name: [''],
      rollNo: [''],
      admissionNo: [''],
      class: ['']
    });
    this.siblings.push(siblingGroup);
  }

  removeSibling(index: number) {
    this.siblings.removeAt(index);
  }

}
