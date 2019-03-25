import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Ticket } from '../../../models/ticket';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  public ticketList: Ticket[] = [];

  public displayArchivedTicket = false;

  constructor(public ticketService: TicketService) {
    this.ticketService.tickets$.subscribe((tickets) => {
      this.ticketList = tickets;
    });
  }

  ngOnInit() {
  }

  archiveTicket(ticket: Ticket) {
    this.ticketService.archiveTicket(ticket);
  }

  deleteTicket(ticket: Ticket) {
    this.ticketService.deleteTicket(ticket);
  }

}
