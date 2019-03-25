import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { BehaviorSubject } from 'rxjs/index';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, take } from 'rxjs/internal/operators';
import { ErrorService } from '../error/error.service';
import { httpOptionsBase, serverUrl } from '../../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */
  private ticketList: Ticket[] = [];

  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public tickets$: BehaviorSubject<Ticket[]> = new BehaviorSubject(this.ticketList);

  private url = serverUrl + '/tickets';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.getTicket();
  }

  archiveTicket(ticket: Ticket) {
    ticket.archived = true;
    this.updateTicket(this.removeStudentList(ticket));
  }

  getTicket() {
    this.http.get<Ticket[]>(this.url)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => this.errorService.handleError<Ticket[]>(err, 'get /tickets', [])),
        filter((tickets) => tickets.length > 0))
      .subscribe((tickets: Ticket[]) => {
        this.tickets$.next(tickets);
        this.ticketList = tickets;
      });
  }

  updateTicket(ticket: Ticket) {
    const urlWithId = this.url + '/' + ticket.id;
    this.http.put<Ticket>(urlWithId, ticket, this.httpOptions)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<Ticket>(err, 'put /tickets by id=${ticket.id}'))
      ).subscribe((_ticket) => this.getTicket());
  }

  addTicket(ticket: Ticket) {
    this.http.post<Ticket>(this.url, ticket, this.httpOptions)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<Ticket>(err, 'post /tickets'))
      ).subscribe((_ticket) => this.getTicket());
  }

  deleteTicket(ticket: Ticket) {
    const urlWithId = this.url + '/' + ticket.id;
    this.http.delete<Ticket>(urlWithId, this.httpOptions)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) =>
          this.errorService.handleError<Ticket>(err, `delete /tickets by id=${ticket.id}`))
      ).subscribe((_ticket) => this.getTicket());
  }

  private removeStudentList(ticket) {
    if (ticket.students) {
      delete ticket.students;
    }
    return ticket;
  }
}
