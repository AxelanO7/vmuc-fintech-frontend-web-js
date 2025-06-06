import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/16/solid";
import DefaultLayout from "@/layouts/default_layout";
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
import { useEffect, useState } from "react";
import { employeeType } from "@/core/interfaces/data";
import { actionType, breadcrumsItem } from "@/core/interfaces/props";
import Breadcrumb from "@/components/breadcrumb";
import Swal from "sweetalert2";
import { ApiHelpers } from "@/helpers/api";
import { Urls } from "@/helpers/url";

export default function EmployeePage() {
  // ~*~ // Manipulate Modal // ~*~ //
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentData, setCurrentData] = useState<employeeType | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const renderManipulateComponent = ({
    action,
    dataEdit,
  }: {
    action: actionType;
    dataEdit?: employeeType;
  }) => {
    return (
      <ManipulateEmployeeDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        currentData={currentData}
        setCurrentData={setCurrentData}
        setIsEdit={setIsEdit}
        dataEdit={dataEdit}
        action={action}
        onSave={() => handleOnSaveManipulate()}
      />
    );
  };

  const handleOnSaveManipulate = () => {
    if (!isEdit) {
      addEmployee();
    } else {
      editEmployee();
    }
  };

  // ~*~ // End of Manipulate Modal // ~*~ //

  // ~*~ // Table // ~*~ //
  const [tableItems, setTableItems] = useState<employeeType[]>([]);

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

  // ~*~ // Functions // ~*~ //
  const getEmployees = async () => {
    ApiHelpers.get({
      url: Urls.employeeAccount,
      successCallback: (response) => {
        setTableItems(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  const addEmployee = async () => {
    const postBody: employeeType = {
      name: currentData?.name || "",
      phone: currentData?.phone || "",
      address: currentData?.address || "",
      position: currentData?.position || "",
      id_user: 1,
    };
    ApiHelpers.post({
      url: Urls.employeeAccount,
      data: postBody,
      successCallback: () => {
        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
        getEmployees();
        onOpenChange();
      },
      errorCallback: () => {
        Swal.fire("Gagal", "Data gagal ditambahkan", "error");
      },
    });
  };

  const editEmployee = async () => {
    const postBody: employeeType = {
      id: currentData?.id,
      name: currentData?.name || "",
      phone: currentData?.phone || "",
      address: currentData?.address || "",
      position: currentData?.position || "",
      id_user: 1,
    };
    ApiHelpers.put({
      url: `${Urls.employeeAccount}/${currentData?.id}`,
      data: postBody,
      successCallback: () => {
        Swal.fire("Berhasil", "Data berhasil diubah", "success");
        getEmployees();
        onOpenChange();
      },
      errorCallback: () => {
        Swal.fire("Gagal", "Data gagal diubah", "error");
      },
    });
  };

  const deleteEmployee = async (id: number) => {
    ApiHelpers.delete({
      url: `${Urls.employeeAccount}/${id}`,
      successCallback: () => {
        Swal.fire("Berhasil", "Data berhasil dihapus", "success");
        getEmployees();
      },
      errorCallback: () => {
        Swal.fire("Gagal", "Data gagal dihapus", "error");
      },
    });
  };

  // ~*~ // End of Functions // ~*~ //

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Karyawan</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Karyawan</h1>

        <div className="flex justify-between mt-4">
          {renderManipulateComponent({ action: actionType.ADD })}
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
          <TableBody emptyContent="Data tidak ditemukan">
            {tableItems.map((data) => (
              <TableRow key={data.id} className="bg-gray-50">
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.position}</TableCell>
                <TableCell className="text-center flex justify-evenly">
                  {renderManipulateComponent({
                    action: actionType.EDIT,
                    dataEdit: data,
                  })}
                  <TrashIcon
                    className="text-danger w-6 h-6"
                    onClick={() => {
                      deleteEmployee(data.id!);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DefaultLayout>
  );
}
