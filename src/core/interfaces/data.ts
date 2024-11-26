export interface refPostType {
  id: number;
  accountName: string;
  accountCode: string;
  accountType: string;
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
  ref_post: string;
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
