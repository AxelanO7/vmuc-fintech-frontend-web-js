export interface ActionTypes {
  action: "add" | "edit";
}

export interface RefPostData {
  id: number;
  accountName: string;
  accountCode: string;
  accountType: string;
}
