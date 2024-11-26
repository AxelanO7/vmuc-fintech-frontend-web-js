import { generalJournaType, refPostType } from "./data";

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
  dataEdit?: generalJournaType;
  action: string;
  onSave: ({ action }: { action: string }) => void;
}
