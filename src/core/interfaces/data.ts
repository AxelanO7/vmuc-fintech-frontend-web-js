export interface refPostType {
  id?: number;
  name: string;
  type: string;
  code: number;
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

export interface periodeType {
  id?: number;
  period: string;
  description: string;
  payroll: payrollType[];
  adjusment_entries: adjusmentEntriesType[];
  general_journal: generalJournalType[];
  trial_balance: trialBalanceType[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface payrollType {
  id?: number;
  salary: number;
  bonus: number;
  penalty: number;
  total: number;
  id_periode: number;
  id_employee: number;
  employee?: employeeType;
  payroll_periode?: periodeType;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface adjusmentEntriesType {
  id?: number;
  name_account: string;
  date: string;
  id_ref: number;
  information: string;
  debit: number;
  kredit: number;
  id_periode: number;
  periode?: periodeType;
  ref?: refPostType;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface trialBalanceType {
  id?: number;
  name_account: string;
  id_ref: number;
  debit: number;
  kredit: number;
  id_periode: number;
  periode?: periodeType;
  ref?: refPostType;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface generalJournalType {
  id?: number;
  name_account: string;
  date: string;
  id_ref?: number;
  information: string;
  debit: number;
  kredit: number;
  ref?: refPostType;
  id_periode: number;
  periode?: periodeType;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface generalLedgerType {
  id?: number;
  name_general_ledger: string;
  date: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface reportPeriodType {
  period: periodeType;
  trial_balance: trialBalanceType[];
}