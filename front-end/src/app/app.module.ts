import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.route';

import { ErrorService, TicketService, StudentService } from '../services';
import { HeaderComponent } from './header';
import { StudentsPageComponent, TicketsPageComponent, NotFoundPageComponent } from './pages';
import { TicketComponent, TicketFormComponent, TicketListComponent } from './tickets';
import { StudentComponent, StudentDetailsComponent, StudentFormComponent, StudentListComponent } from './students';
import { ErrorComponent } from './core/error/error.component';
import { StudentDetailsPageComponent } from './pages/student-details-page/student-details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    TicketFormComponent,
    TicketListComponent,
    HeaderComponent,
    StudentComponent,
    StudentDetailsComponent,
    StudentFormComponent,
    StudentListComponent,
    StudentsPageComponent,
    TicketsPageComponent,
    NotFoundPageComponent,
    ErrorComponent,
    StudentDetailsPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [TicketService, StudentService, ErrorService], // All the services need to be provided
  bootstrap: [AppComponent]
})
export class AppModule {
}
