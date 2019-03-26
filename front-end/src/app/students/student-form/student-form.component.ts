import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student/student.service';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  public studentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public studentService: StudentService) {
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: ['']
    });
  }

  ngOnInit() {
  }

  addStudent() {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.getRawValue() as Student;
      this.studentService.addStudent(student);
    }
  }

}
