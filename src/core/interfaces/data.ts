export interface refPostType {
  id: number;
  accountName: string;
  accountCode: string;
  accountType: string;
}

export interface generalJournaType {
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
