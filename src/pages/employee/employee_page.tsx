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
import ManipulateEmployeeDialog from "./manipulate_employee_modal";
import { useState } from "react";
import { employeeType } from "../../core/interfaces/data";
import { breadcrumsItem } from "../../core/interfaces/props";
import Breadcrumb from "../../components/breadcrumb";

export default function EmployeePage() {
  // ~*~ // Manipulate Modal // ~*~ //
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState<string>("");
  const [employeeAddress, setEmployeeAddress] = useState<string>("");
  const [employeePosition, setEmployeePosition] = useState<string>("");

  const renderManipulateComponent = ({
    action,
    dataEdit,
  }: {
    action: string;
    dataEdit?: employeeType;
  }) => {
    return (
      <ManipulateEmployeeDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        employeeName={employeeName}
        setEmployeeName={setEmployeeName}
        employeePhoneNumber={employeePhoneNumber}
        setEmployeePhoneNumber={setEmployeePhoneNumber}
        employeeAddress={employeeAddress}
        setEmployeeAddress={setEmployeeAddress}
        employeePosition={employeePosition}
        setEmployeePosition={setEmployeePosition}
        dataEdit={dataEdit}
        action={action}
        onSave={() => handleOnSaveManipulate({ action })}
      />
    );
  };

  const handleOnSaveManipulate = ({ action }: { action: string }) => {
    console.log("Account Name: ", employeeName);
    console.log("Account Code: ", employeePhoneNumber);
    console.log("Account Type: ", employeeAddress);

    if (action === "add") {
      console.log("Add Karyawan");
    } else {
      console.log("Edit Karyawan");
    }
  };

  // ~*~ // End of Manipulate Modal // ~*~ //

  // ~*~ // Table // ~*~ //
  const tableItems: employeeType[] = [
    {
      id: 1,
      name: "Agus",
      phoneNumber: "08123456789",
      address: "Panjer",
      position: "Karyawan",
    },
    {
      id: 2,
      name: "Hendrawan",
      phoneNumber: "08123456789",
      address: "Panjer",
      position: "FO",
    },
  ];

  const tableHeaderItems = [
    { name: "Nama Pegawai", className: "" },
    {
      name: "No Telepon",
      className: "",
    },
    {
      name: "Alamat",
      className: "",
    },
    {
      name: "Jabatan",
      className: "",
    },
    {
      name: "Aksi",
      className: "text-center",
    },
  ];

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Karyawan",
      href: "employee",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Karyawan</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Karyawan</h1>

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
              <TableColumn key={index} className={item.className}>
                {item.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {tableItems.map((data) => (
              <TableRow key={data.id} className="bg-gray-50">
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.phoneNumber}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.position}</TableCell>
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
