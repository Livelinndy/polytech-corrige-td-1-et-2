import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';
import { Student } from '../../models/student';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, take } from 'rxjs/internal/operators';
import { ErrorService } from '../error/error.service';
import { httpOptionsBase, serverUrl } from '../../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */
  private studentList: Student[] = [];

  private url = serverUrl + '/students';

  private httpOptions = httpOptionsBase;

  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);

  /**
   * StudentViewed: Observable which stores the current student viewed (student details).
   * {BehaviorSubject<Student>}
   */
  public studentViewed$: BehaviorSubject<Student> = new BehaviorSubject<Student>(null);

  constructor(public http: HttpClient, private errorService: ErrorService) {
  }

  getStudent() {
    this.http.get<Student[]>(this.url)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => this.errorService.handleError<Student[]>(err, 'get /students', [])))
      .subscribe((students: Student[]) => {
        this.students$.next(students);
        this.studentList = students;
      });
  }

  getStudentById(id: string) {
    const urlWithId = this.url + '/' + id;
    this.http.get<Student[]>(urlWithId)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => this.errorService.handleError<Student>(err, `get /students by id=${id}`)))
      .subscribe((student: Student) => {
        this.studentViewed$.next(student);
      });
  }

  updateStudent(student: Student) {
    const urlWithId = this.url + '/' + student.id;
    this.http.put<Student>(urlWithId, student, this.httpOptions)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<Student>(err, 'put /students by id=${student.id}'))
      ).subscribe((_student) => this.getStudent());
  }

  addStudent(student: Student) {
    this.http.post<Student>(this.url, student, this.httpOptions)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<Student>(err, 'post /students'))
      ).subscribe((_student) => this.getStudent());
  }

  deleteStudent(student: Student) {
    const urlWithId = this.url + '/' + student.id;
    this.http.delete<Student>(urlWithId, this.httpOptions)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<Student>(err, `delete /students by id=${student.id}`))
      ).subscribe((_student) => this.getStudent());
  }

}
