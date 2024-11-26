import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/16/solid";
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
import ManipulateRefPostDialog from "./manipulate_ref_post_modal";
import { useState } from "react";
import { refPostType } from "../../core/interfaces/data";
import { breadcrumsItem } from "../../core/interfaces/props";
import Breadcrumb from "../../components/breadcrumb";

export default function RefPostPage() {
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
    dataEdit?: refPostType;
  }) => {
    return (
      <ManipulateRefPostDialog
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

  const handleOnSaveManipulate = ({ action }: { action: string }) => {
    console.log("Account Name: ", accountName);
    console.log("Account Code: ", accountCode);
    console.log("Account Type: ", accountType);

    if (action === "add") {
      console.log("Add Ref Post");
    } else {
      console.log("Edit Ref Post");
    }
  };

  // ~*~ // End of Manipulate Modal // ~*~ //

  // ~*~ // Table // ~*~ //
  const tableItems: refPostType[] = [
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

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Akun Ref Post",
      href: "ref",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Akun Ref Post</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Akun Ref Post</h1>

        <div className="flex justify-between mt-4">
          {renderManipulateComponent({ action: "add" })}
          <div className="flex gap-2">
            <Input placeholder="Cari" type="search" />
            <Button color="primary" isIconOnly>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Table aria-label="Periode Table" className="mt-8">
          <TableHeader>
            {tableHeaderItems.map((item, index) => (
              <TableColumn key={index} className="text-center">
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
                  <TrashIcon className="text-danger w-6 h-6" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </div>
    </DefaultLayout>
  );
}
