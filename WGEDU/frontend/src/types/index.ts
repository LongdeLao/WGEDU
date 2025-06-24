
export interface User {
  username: string;
  password: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  name: string;
}

export interface Class {
  id: string;
  subject: string;
  time: string;
  teacher: string;
  day: string;
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  subject: string;
  status?: 'submitted' | 'pending';
  notes?: string;
}

export interface Student {
  id: string;
  name: string;
  classes: Class[];
  assignments: Assignment[];
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
}

export interface AttendedClass {
  id: string;
  subject: string;
  date: string;
  amount: number;
}
