import { Ticket } from '../models/ticket';
import { STUDENT_MOCK } from './students.mock';

const dateToday: Date = new Date();

export const TICKETS_MOCKED: Ticket[] = [
  {
    title: 'SI4 in Madrid',
    description: '',
    date: dateToday,
    students: [STUDENT_MOCK[0]],
    major: 'SI',
    archived: true
  },
  {
    title: 'SI5 in Paris',
    description: 'Description du voyage',
    date: dateToday,
    students: [STUDENT_MOCK[1]],
    major: 'GB',
    archived: false
  },
];
