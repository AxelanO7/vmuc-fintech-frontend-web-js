import { employeeType, generalJournalType, refPostType } from "./data";

export interface propsManipulateRefPost {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  setIsEdit: (edit: boolean) => void;
  dataEdit?: refPostType;
  staticEdit: boolean;
  currentData: refPostType | null;
  setCurrentData: (data: refPostType | null) => void;
  onSave: () => void;
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

export interface propsManipulateEmployee {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  employeeName: string;
  setEmployeeName: (name: string) => void;
  employeePhoneNumber: string;
  setEmployeePhoneNumber: (code: string) => void;
  employeeAddress: string;
  setEmployeeAddress: (type: string) => void;
  employeePosition: string;
  setEmployeePosition: (position: string) => void;
  dataEdit?: employeeType;
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
