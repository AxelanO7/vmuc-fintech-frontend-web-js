import { generalJournalType, refPostType } from "./data";

export interface propsManipulateRefPost {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  accountName: string;
  setAccountName: (name: string) => void;
  accountCode: string;
  setAccountCode: (code: string) => void;
  accountType: string;
  setAccountType: (type: string) => void;
  dataEdit?: refPostType;
  action: string;
  onSave: ({ action }: { action: string }) => void;
}

export interface propsManipulateGeneralJournal {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  accountName: string;
  setAccountName: (name: string) => void;
  accountCode: string;
  setAccountCode: (code: string) => void;
  accountType: string;
  setAccountType: (type: string) => void;
  dataEdit?: generalJournalType;
  action: string;
  onSave: ({ action }: { action: string }) => void;
}

export interface propsBreadcrums {
  items: breadcrumsItem[];
}

export interface breadcrumsItem {
  label: string;
  href: string;
}
