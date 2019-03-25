import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../../../models/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  @Input()
  student: Student;

  @Output()
  updateStudent: EventEmitter<Student> = new EventEmitter<Student>();

  studentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.studentForm = this.formBuilder.group({
      notes: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  addNote() {
    if (this.studentForm.valid) {
      const student: Student = this.student;
      student.notes = this.studentForm.getRawValue().notes;
      this.updateStudent.emit(student);
    }

  }
}
