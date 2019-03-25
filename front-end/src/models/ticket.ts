import { Student } from './student';

export interface Ticket {
  id?: string;
  title?: string;
  description?: string;
  date?: Date;
  students?: Student[];
  studentIds?: string[];
  major?: string;
  archived?: boolean;
}

export enum MajorEnum {
  GB,
  SI,
  GE
}
