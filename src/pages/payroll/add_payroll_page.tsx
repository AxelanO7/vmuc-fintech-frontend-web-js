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
import {
  employeeType,
  payrollPeriodType,
  payrollType,
} from "../../core/interfaces/data";
import { breadcrumsItem } from "../../core/interfaces/props";
import DefaultLayout from "../../layouts/default_layout";
import { Urls } from "../../helpers/url";
import { ApiHelpers } from "../../helpers/api";
import Swal from "sweetalert2";

export default function AddPayrollPage() {
  const [employees, setEmployees] = useState<employeeType[]>([]);
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("");
  const [tableItems, setTableItems] = useState<payrollType[]>([]);

  // ~*~ // Table // ~*~ //
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
      url: Urls.employeeAccount,
      successCallback: (response) => {
        setEmployees(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  const handleSave = () => {
    tableItems.forEach((item) => {
      item.id_periode = tableItems.indexOf(item) + 1;
    });

    const data: payrollPeriodType = {
      period: period,
      description: description,
      payrolls: tableItems.map((item) => ({
        salary: parseInt(item.salary.toString()),
        bonus: parseInt(item.bonus.toString()),
        penalty: parseInt(item.penalty.toString()),
        total: item.salary + item.bonus - item.penalty,
        id_periode: item.id_periode || 0,
        id_employee: item.employee?.id || 0,
      })),
    };

    ApiHelpers.post({
      url: Urls.periodPayroll,
      data: data,
      successCallback: () => {
        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
        // window.location.href = "/payroll";
      },
      errorCallback: () => {
        Swal.fire("Gagal", "Data gagal ditambahkan", "error");
      },
    });
  };

  const handleChangeTableItems = (
    index: number,
    key: string,
    value: any,
    isNumber: boolean = false
  ) => {
    setTableItems(
      tableItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [key]: isNumber ? parseInt(value) : value,
          };
        } else {
          return item;
        }
      })
    );
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
              <TableRow>
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
                              handleChangeTableItems(
                                item.id || 0,
                                "employee",
                                employee
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
                      handleChangeTableItems(
                        item.id || 0,
                        "salary",
                        e.target.value,
                        true
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    placeholder="0"
                    onChange={(e) =>
                      handleChangeTableItems(
                        item.id || 0,
                        "bonus",
                        e.target.value,
                        true
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    placeholder="0"
                    onChange={(e) =>
                      handleChangeTableItems(
                        item.id || 0,
                        "penalty",
                        e.target.value,
                        true
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
                id_employee: 0,
                id_periode: 0,
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
