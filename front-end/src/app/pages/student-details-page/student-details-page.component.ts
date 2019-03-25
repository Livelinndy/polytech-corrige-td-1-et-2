import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Student } from '../../../models/student';
import { StudentService } from '../../../services';

@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html',
  styleUrls: ['./student-details-page.component.scss']
})
export class StudentDetailsPageComponent implements OnInit {

  public student: Student;

  constructor(private route: ActivatedRoute, public studentService: StudentService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => this.studentService.getStudentById(params.get('id')));
  }

  updateStudent(student: Student) {
    this.studentService.updateStudent(student);
  }
}
