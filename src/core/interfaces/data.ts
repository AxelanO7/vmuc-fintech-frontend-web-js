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
  phone: string;
  address: string;
  position: string;
  id_user?: number;
}

export interface payrollType {
  id?: number;
  period: string;
  description: string;
  payroll: payrollContentType[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface payrollContentType {
  id?: number;
  salary: number;
  bonus: number;
  penalty: number;
  total: number;
  id_payroll_periode: number;
  id_employee: number;
  employee?: employeeType;
  payroll_periode?: payrollType;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
