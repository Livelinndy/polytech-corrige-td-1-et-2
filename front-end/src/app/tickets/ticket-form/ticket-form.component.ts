import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../../services/ticket/ticket.service';
import { MajorEnum } from '../../../models/ticket';
import { Student } from '../../../models/student';
import { StudentService } from '../../../services/student/student.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)
  /**
   * TicketForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms
   */
  public ticketForm: FormGroup;

  public majorList: string[];
  public studentList: Student[];

  constructor(public formBuilder: FormBuilder, public ticketService: TicketService, public studentService: StudentService) {
    // Form creation
    this.ticketForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(68)]],
      major: ['', [Validators.required]],
      student: ['', [Validators.required]]
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
    this.setMajorList();
    this.studentService.students$.subscribe((students) => this.studentList = students);
    this.studentService.getStudent();
  }

  ngOnInit() {
  }

  addTicket() {
    if (this.ticketForm.valid) {
      const studentID: string = this.ticketForm.getRawValue().student;
      const ticket = this.ticketForm.getRawValue();
      delete ticket.student;
      ticket.date = new Date();
      ticket.archived = false;
      ticket.studentIds = [studentID];
      this.ticketService.addTicket(ticket);
    }
  }

  setMajorList() {
    const keys = Object.keys(MajorEnum);
    this.majorList = keys.slice(keys.length / 2, keys.length);
  }

}
