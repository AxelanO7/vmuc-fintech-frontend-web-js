import {
  HomeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import ManipulateGeneralJournalDialog from "./manipulate_general_journal_modal";
import { useState } from "react";
import DefaultLayout from "../../../layouts/default_layout";

// ~*~ // Interface // ~*~ //
export interface generalJournaType {
  id: number;
  accountName: string;
  accountCode: string;
  accountType: string;
}

// ~*~ // End of Interface // ~*~ //

export default function GeneralJournalPage() {
  // ~*~ // Manipulate Modal // ~*~ //
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [accountName, setAccountName] = useState<string>("");
  const [accountCode, setAccountCode] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");

  const renderManipulateComponent = ({
    action,
    dataEdit,
  }: {
    action: string;
    dataEdit?: generalJournaType;
  }) => {
    return (
      <ManipulateGeneralJournalDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        accountName={accountName}
        setAccountName={setAccountName}
        accountCode={accountCode}
        setAccountCode={setAccountCode}
        accountType={accountType}
        setAccountType={setAccountType}
        dataEdit={dataEdit}
        action={action}
        onSave={() => handleOnSaveManipulate({ action })}
      />
    );
  };

  const handleOnSaveManipulate = ({
    action,
  }: {
    action: string;
  }) => {
    if (action === "add") {
      console.log("Add General Journal");
    } else {
      console.log("Edit General Journal");
    }
  };

  // ~*~ // End of Manipulate Modal // ~*~ //

  // ~*~ // Table // ~*~ //
  const tableItems: generalJournaType[] = [
    {
      id: 1,
      accountName: "Kas",
      accountCode: "110",
      accountType: "Asset",
    },
    {
      id: 2,
      accountName: "Piutang",
      accountCode: "111",
      accountType: "Asset",
    },
    {
      id: 3,
      accountName: "Perlengkapan",
      accountCode: "112",
      accountType: "Asset",
    },
    {
      id: 4,
      accountName: "Peralatan",
      accountCode: "113",
      accountType: "Asset",
    },
    {
      id: 5,
      accountName: "Hutang",
      accountCode: "210",
      accountType: "Liabilitas",
    },
    {
      id: 6,
      accountName: "Modal",
      accountCode: "310",
      accountType: "Modal",
    },
    {
      id: 7,
      accountName: "Pendapatan",
      accountCode: "410",
      accountType: "Pendapatan",
    },
    {
      id: 8,
      accountName: "Beban",
      accountCode: "510",
      accountType: "Beban",
    },
  ];

  const tableHeaderItems: string[] = [
    "Nama Akun",
    "Kode Akun",
    "Tipe Akun",
    "Aksi",
  ];

  // ~*~ // End of Table // ~*~ //

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Jurnal Umum</h1>
      <div className="flex items-center bg-gray-300 px-6 py-2">
        <HomeIcon className="w-5 h-5" />
        <p className="ml-2 font-semibold">Jurnal Umum</p>
      </div>
      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Jurnal Umum</h1>
        <div className="flex justify-between mt-4">
          {renderManipulateComponent({ action: "add" })}
          <div className="flex gap-2">
            <Input placeholder="Cari" />
            <Button color="primary" isIconOnly>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <Table aria-label="Periode Table" className="mt-8">
          <TableHeader>
            {tableHeaderItems.map((item) => (
              <TableColumn key={item} className="text-center">
                {item}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {tableItems.map((data) => (
              <TableRow key={data.id} className="bg-gray-50">
                <TableCell className="text-center">
                  {data.accountName}
                </TableCell>
                <TableCell className="text-center">
                  {data.accountCode}
                </TableCell>
                <TableCell className="text-center">
                  {data.accountType}
                </TableCell>
                <TableCell className="text-center flex justify-evenly">
                  {renderManipulateComponent({
                    action: "edit",
                    dataEdit: data,
                  })}
                  <TrashIcon className="text-danger w-10 h-10" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DefaultLayout>
  );
}
