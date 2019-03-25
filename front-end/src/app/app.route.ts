import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotFoundPageComponent, TicketsPageComponent, StudentsPageComponent, StudentDetailsPageComponent } from './pages';

const routes: Route[] = [
  {path: 'tickets', component: TicketsPageComponent},
  {path: 'students/:id', component: StudentDetailsPageComponent},
  {path: 'students', component: StudentsPageComponent},
  {path: '', redirectTo: '/tickets', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
