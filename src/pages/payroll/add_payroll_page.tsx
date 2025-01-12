import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import Breadcrumb from "../../components/breadcrumb";
import { employeeType, payrollType } from "../../core/interfaces/data";
import { breadcrumsItem } from "../../core/interfaces/props";
import DefaultLayout from "../../layouts/default_layout";
import {
  baseUrlEmployeeAccount,
  baseUrlPayrollEmployee,
} from "../../helpers/url";
import { ApiHelpers } from "../../helpers/api";
import Swal from "sweetalert2";

export default function AddPayrollPage() {
  const [employees, setEmployees] = useState<employeeType[]>([]);
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("");

  // ~*~ // Table // ~*~ //
  const [tableItems, setTableItems] = useState<payrollType[]>([]);

  const tableHeaderItems = [
    {
      name: "Nama Karyawan",
      className: "",
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
      className: "w-20",
    },
  ];

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Gaji Karyawan",
      href: "trial-balance",
    },
    {
      label: "Tambah Gaji Karyawan",
      href: "add-trial-balance",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  // ~*~ // Functions // ~*~ //
  const getEmployees = async () => {
    ApiHelpers.get({
      url: baseUrlEmployeeAccount(),
      successCallback: (response) => {
        setEmployees(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  const handleSave = () => {
    const data = tableItems.map((item) => {
      return {
        ...item,
        period: period,
        description: description,
        total: item.salary + item.bonus - item.penalty,
      };
    });

    ApiHelpers.post({
      url: `${baseUrlPayrollEmployee()}s`,
      data: data,
      successCallback: () => {
        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
        window.location.href = "/payroll";
      },
      errorCallback: () => {},
    });
  };

  // ~*~ // End of Functions // ~*~ //

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Gaji Karyawan</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 mt-4 mx-4 py-8 px-4">
        <h1 className="text-3xl font-medium text-gray-600">Gaji Karyawan</h1>

        <div className="flex mt-8 gap-4 ml-8">
          <div>
            <p className="ml-2 font-normal">Periode</p>
            <Input
              type="date"
              className="w-max"
              onChange={(e) => {
                setPeriod(e.target.value);
              }}
            />
          </div>
          <div>
            <p className="ml-2 font-normal">Deskripsi</p>
            <Input
              className="w-96"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-200 mx-4 mt-4 p-4">
        <Table aria-label="Periode Table">
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
              <TableRow key={item.id}>
                <TableCell className="text-center">
                  <Dropdown>
                    <DropdownTrigger>
                      <Input
                        placeholder="Pilih nama karyawan"
                        variant="bordered"
                        className="cursor-pointer"
                        defaultValue={item.employee?.name}
                        value={item.employee?.name}
                        endContent={<ChevronDownIcon className="w-5 h-5" />}
                        readOnly
                      />
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownSection>
                        {employees.map((employee) => (
                          <DropdownItem
                            key={employee.id}
                            onClick={() =>
                              setTableItems(
                                tableItems.map((tableItem) =>
                                  tableItem.id === item.id
                                    ? {
                                        ...tableItem,
                                        id_employee: employee.id || 0,
                                        employee: employee,
                                      }
                                    : tableItem
                                )
                              )
                            }
                            className="cursor-pointer"
                          >
                            {employee.name}
                          </DropdownItem>
                        ))}
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    value={item.employee?.position}
                    readOnly
                    className="cursor-not-allowed"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    placeholder="0"
                    onChange={(e) =>
                      setTableItems(
                        tableItems.map((tableItem) =>
                          tableItem.id === item.id
                            ? {
                                ...tableItem,
                                salary: parseInt(e.target.value),
                              }
                            : tableItem
                        )
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    placeholder="0"
                    onChange={(e) =>
                      setTableItems(
                        tableItems.map((tableItem) =>
                          tableItem.id === item.id
                            ? {
                                ...tableItem,
                                bonus: parseInt(e.target.value),
                              }
                            : tableItem
                        )
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    placeholder="0"
                    onChange={(e) =>
                      setTableItems(
                        tableItems.map((tableItem) =>
                          tableItem.id === item.id
                            ? {
                                ...tableItem,
                                penalty: parseInt(e.target.value),
                              }
                            : tableItem
                        )
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    value={(item.salary + item.bonus - item.penalty).toString()}
                    readOnly
                    className="cursor-not-allowed"
                  />
                </TableCell>
                <TableCell className="text-center flex justify-evenly">
                  <TrashIcon
                    className="text-danger w-6 h-6"
                    onClick={() =>
                      setTableItems(
                        tableItems.filter(
                          (tableItem) => tableItem.id !== item.id
                        )
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-gray-200 mx-4 mt-4 p-4 flex justify-center">
        <Button
          className="w-1/2 text-white flex"
          startContent={<PlusIcon className="w-5 h-5" />}
          color="secondary"
          onClick={() =>
            setTableItems([
              ...tableItems,
              {
                salary: 0,
                bonus: 0,
                penalty: 0,
                total: 0,
                description: "",
                period: "",
                id_employee: 0,
                employee: undefined,
              },
            ])
          }
        >
          Tambah Baris Baru
        </Button>
      </div>

      <div className="bg-gray-200 mx-4 mt-4 p-4">
        <div className="flex w-1/2 pl-12 mt-4 font-medium">
          <p className="w-1/3">Total</p>
          <p className="w-1/3">
            Rp.{" "}
            {tableItems.reduce(
              (acc, item) => acc + item.salary + item.bonus,
              0
            )}
          </p>
          <p className="w-1/3">
            Rp. {tableItems.reduce((acc, item) => acc + item.penalty, 0)}
          </p>
        </div>
        <div className="flex w-1/2 mt-4 pl-12 font-medium">
          <p className="w-1/3">Selisih</p>
          <div className="w-1/3" />
          <p className="w-1/3">
            Rp.{" "}
            {tableItems.reduce((acc, item) => acc + item.salary, 0) +
              tableItems.reduce((acc, item) => acc + item.bonus, 0) -
              tableItems.reduce((acc, item) => acc + item.penalty, 0)}
          </p>
        </div>
        <div className="w-full flex justify-end mt-4">
          <Button color="primary" onClick={handleSave}>
            Simpan
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
}
