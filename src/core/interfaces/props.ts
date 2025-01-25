import {
  employeeType,
  generalJournalType,
  periodeType,
  refPostType,
} from "./data";

export interface propsModal {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
}

export interface propsDetailPayroll extends propsModal {
  data: periodeType;
}

export interface propsManipulateRefPost extends propsModal {
  setIsEdit: (edit: boolean) => void;
  dataEdit?: refPostType;
  staticEdit: boolean;
  currentData: refPostType | null;
  setCurrentData: (data: refPostType | null) => void;
  onSave: () => void;
}

export interface propsManipulateGeneralJournal extends propsModal {
  accountName: string;
  setAccountName: (name: string) => void;
  accountCode: string;
  setAccountCode: (code: string) => void;
  accountType: string;
  setAccountType: (type: string) => void;
  dataEdit?: generalJournalType;
  action: actionType;
  onSave: ({ action }: { action: string }) => void;
}

export interface propsManipulateEmployee extends propsModal {
  setIsEdit: (edit: boolean) => void;
  dataEdit?: employeeType;
  currentData: employeeType | null;
  setCurrentData: (data: employeeType | null) => void;
  action: actionType;
  onSave: () => void;
}

// export interface propsDetailLedger extends propsModal {}

export interface propsBreadcrums {
  items: breadcrumsItem[];
}

export interface breadcrumsItem {
  label: string;
  href: string;
}

export enum actionType {
  ADD = "add",
  EDIT = "edit",
}
