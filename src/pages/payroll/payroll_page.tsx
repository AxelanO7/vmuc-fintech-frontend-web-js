import {
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
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
} from "@nextui-org/react";
import { payrollType } from "../../core/interfaces/data";
import { breadcrumsItem } from "../../core/interfaces/props";
import DefaultLayout from "../../layouts/default_layout";
import Breadcrumb from "../../components/breadcrumb";
import { useEffect, useState } from "react";
import { ApiHelpers } from "../../helpers/api";
import { Urls } from "../../helpers/url";

export default function PayrollPage() {
  // ~*~ // Table // ~*~ //
  const tableHeaderParentItems = [
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
      className: "w-40",
    },
  ];

  const tableHeaderChildItems = [
    {
      name: "Nama",
      className: "w-20",
    },
    {
      name: "Jabatan",
      className: "",
    },
    {
      name: "Gaji",
      className: "",
    },
    {
      name: "Bonus",
      className: "",
    },
    {
      name: "Potongan",
      className: "",
    },
    {
      name: "Total",
      className: "",
    },
    {
      name: "Aksi",
      className: "w-40",
    },
  ];

  const [tableItems, setTableItems] = useState<payrollType[]>([]);

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Gaji Karyawan",
      href: "payroll",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  // ~*~ // Functions // ~*~ //
  const getPayrolls = () => {
    ApiHelpers.get({
      url: Urls.payrollPeriodEmployee,
      successCallback(response) {
        setTableItems(response.data.data);
      },
      errorCallback() {},
    });
  };

  const handleAdd = () => {
    window.location.replace("/" + "add-payroll");
  };

  // ~*~ // End of Functions // ~*~ //

  useEffect(() => {
    getPayrolls();
  }, []);

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Gaji Karyawan</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Gaji Karyawan</h1>

        <div className="flex justify-between mt-4">
          <Button
            className="w-max"
            color="primary"
            onPress={handleAdd}
            startContent={<PlusIcon className="w-5 h-5" />}
          >
            Gaji Karyawan
          </Button>
          <div className="flex gap-2">
            <Input placeholder="Cari" type="search" />
            <Button color="primary" isIconOnly>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4">
          {tableItems.length === 0 ? (
            <Table aria-label="Periode Table">
              <TableHeader>
                {tableHeaderParentItems.map((item) => (
                  <TableColumn
                    key={item.name}
                    className={`text-center ${item.className}`}
                  >
                    {item.name}
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody emptyContent="Data tidak ditemukan"></TableBody>
            </Table>
          ) : (
            tableItems.map((item, index) => (
              <div key={item.id}>
                <Table aria-label="Periode Table">
                  <TableHeader>
                    {tableHeaderParentItems.map((item) => (
                      <TableColumn
                        key={item.name}
                        className={`text-center ${item.className}`}
                      >
                        {item.name}
                      </TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    <TableRow key={item.id} className="bg-gray-50">
                      <TableCell className="text-center">{item.id}</TableCell>
                      <TableCell className="text-center">
                        {item.period}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.description}
                      </TableCell>
                      <TableCell className="text-center flex justify-evenly">
                        <DocumentArrowDownIcon className="text-primary w-6 h-6" />
                        <TrashIcon className="text-danger w-6 h-6" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table
                  aria-label="Periode Table"
                  className={`mt-2 ${
                    index === tableItems.length - 1 ? "" : "mb-8"
                  }`}
                >
                  <TableHeader>
                    {tableHeaderChildItems.map((item) => (
                      <TableColumn
                        key={item.name}
                        className={`text-center ${item.className}`}
                      >
                        {item.name}
                      </TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody emptyContent="Data tidak ditemukan">
                    {item.payroll.map((item) => (
                      <TableRow key={item.id} className="bg-gray-50">
                        <TableCell className="text-center">
                          {item.employee?.name ?? "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.employee?.position ?? "-"}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.salary}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.bonus}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.penalty}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.total}
                        </TableCell>
                        <TableCell className="text-center flex justify-evenly">
                          <TrashIcon className="text-danger w-6 h-6" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
