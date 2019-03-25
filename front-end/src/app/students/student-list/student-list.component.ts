import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student/student.service';

import { Student } from '../../../models/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  public studentList: Student[];

  constructor(public studentService: StudentService, private router: Router) {
    this.studentService.getStudent();
    this.studentService.students$.subscribe((students: Student[]) => this.studentList = students);
  }

  ngOnInit() {
  }

  navigateStudentDetails(student: Student) {
    this.router.navigate([`/students/${student.id}`]);
  }

  deleteStudent(student: Student) {
    this.studentService.deleteStudent(student);
  }
}
