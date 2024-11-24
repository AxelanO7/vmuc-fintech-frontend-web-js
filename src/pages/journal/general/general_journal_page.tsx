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
import { generalJournaType } from "../../../core/interfaces/data";

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
        // ~*~ // ~*~ // ~*~ //
        accountName={accountName}
        setAccountName={setAccountName}
        // ~*~ // ~*~ // ~*~ //
        accountCode={accountCode}
        setAccountCode={setAccountCode}
        // ~*~ // ~*~ // ~*~ //
        accountType={accountType}
        setAccountType={setAccountType}
        // ~*~ // ~*~ // ~*~ //
        dataEdit={dataEdit}
        action={action}
        onSave={() => handleOnSaveManipulate({ action })}
      />
    );
  };

  const handleOnSaveManipulate = ({ action }: { action: string }) => {
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
      period: "Mei/2024",
      description: "Jurnal Umum",
    },
    {
      id: 2,
      period: "Juni/2024",
      description: "Jurnal Umum",
    },
  ];

  const tableHeaderItems = [
    {
      name: "#",
      className: "w-12",
    },
    {
      name: "Periode",
      className: "",
    },
    {
      name: "Deskripsi",
      className: "",
    },
    {
      name: "Aksi",
      className: "",
    },
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
              <TableColumn
                key={item.name}
                className={`text-center ${item.className}`}
              >
                {item.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {tableItems.map((item) => (
              <TableRow key={item.id} className="bg-gray-50">
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="text-center">{item.period}</TableCell>
                <TableCell className="text-center">
                  {item.description}
                </TableCell>
                <TableCell className="text-center flex justify-evenly">
                  {renderManipulateComponent({
                    action: "edit",
                    dataEdit: item,
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
