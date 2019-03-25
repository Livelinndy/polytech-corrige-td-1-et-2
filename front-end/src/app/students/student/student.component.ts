import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @Input()
  student: Student;

  @Output()
  showStudentDetails: EventEmitter<Student> = new EventEmitter<Student>();

  @Output()
  deleteStudent: EventEmitter<Student> = new EventEmitter<Student>();

  constructor() {
  }

  ngOnInit() {
  }

  studentDetails() {
    this.showStudentDetails.emit(this.student);
  }

  studentRemoval() {
    this.deleteStudent.emit(this.student);
  }
}
