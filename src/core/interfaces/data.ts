export interface refPostType {
  id?: number;
  name: string;
  type: string;
  code: number;
}

export interface generalJournalType {
  id: number;
  period: string;
  description: string;
  contents: generalJournalContentType[];
}

export interface generalJournalContentType {
  id: number;
  date: string;
  ref_post: refPostType;
  information: string;
  debit: number;
  credit: number;
}

export interface dashboardType {
  dateContents: dashboardDateContentsType[];
}

export interface dashboardDateContentsType {
  id: number;
  date: string;
  contents: dashboardDateContentType[];
}

export interface dashboardDateContentType {
  id: number;
  period: string;
  description: string;
  status: string;
}

export interface employeeType {
  id?: number;
  name: string;
  phoneNumber: string;
  address: string;
  position: string;
}

export interface payrollType {
  id: number;
  period: string;
  description: string;
  contents: payrollContentType[];
}

export interface payrollContentType {
  id: number;
  employee: employeeType;
  salary: number;
  bonus: number;
  deduction: number;
  total: number;
}
