import {
  HomeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import DefaultLayout from "../../layouts/default_layout";
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
import ManipulateRefPostDialogComponent from "./manipulate_ref_post_page";
import { useState } from "react";

export interface RefPostData {
  id: number;
  accountName: string;
  accountCode: string;
  accountType: string;
}

export default function RefPostPage() {
  // Manipulate Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [accountName, setAccountName] = useState<string>("");
  const [accountCode, setAccountCode] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");

  const renderManipulateRefPostDialog = ({
    action,
    dataEdit,
  }: {
    action: string;
    dataEdit?: RefPostData;
  }) => {
    return (
      <ManipulateRefPostDialogComponent
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
        onSave={() => handleOnSaveManipulateRefPost({ action })}
      />
    );
  };

  const handleOnSaveManipulateRefPost = ({ action }: { action: string }) => {
    console.log("Account Name: ", accountName);
    console.log("Account Code: ", accountCode);
    console.log("Account Type: ", accountType);

    if (action === "add") {
      console.log("Add Ref Post");
    } else {
      console.log("Edit Ref Post");
    }
  };
  // End Manipulate Modal

  const refPostData = [
    {
      id: 1,
      accountName: "Kas",
      accountCode: "110",
      accountType: "Asset",
    },
  ];

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Akun Ref Post</h1>
      <div className="flex items-center bg-gray-300 px-6 py-2">
        <HomeIcon className="w-5 h-5" />
        <p className="ml-2 font-semibold">Akun Ref Post</p>
      </div>
      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Akun Ref Post</h1>
        <div className="flex justify-between mt-4">
          {renderManipulateRefPostDialog({ action: "add" })}
          <div className="flex gap-2">
            <Input placeholder="Cari" />
            <Button color="primary" isIconOnly>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <Table aria-label="Periode Table" className="mt-8">
          <TableHeader>
            <TableColumn className="text-center">Nama Akun</TableColumn>
            <TableColumn className="text-center">Kode Akun</TableColumn>
            <TableColumn className="text-center">Tipe Akun</TableColumn>
            <TableColumn className="w-40 text-center">Aksi</TableColumn>
          </TableHeader>
          <TableBody>
            {refPostData.map((data) => (
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
                  {renderManipulateRefPostDialog({
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
