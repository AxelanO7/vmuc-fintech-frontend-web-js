import {
  ChevronDownIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/16/solid";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Breadcrumb from "../../../components/breadcrumb";
import { breadcrumsItem } from "../../../core/interfaces/props";
import DefaultLayout from "../../../layouts/default_layout";

export default function WorkSheetPage() {
  // ~*~ // Date // ~*~ //
  const dropdownItem = [
    {
      key: 1,
      label: "Januari",
    },
    {
      key: 2,
      label: "Februari",
    },
    {
      key: 3,
      label: "Maret",
    },
    {
      key: 4,
      label: "April",
    },
    {
      key: 5,
      label: "Mei",
    },
    {
      key: 6,
      label: "Juni",
    },
    {
      key: 7,
      label: "Juli",
    },
    {
      key: 8,
      label: "Agustus",
    },
    {
      key: 9,
      label: "September",
    },
    {
      key: 10,
      label: "Oktober",
    },
    {
      key: 11,
      label: "November",
    },
    {
      key: 12,
      label: "Desember",
    },
  ];

  // ~*~ // End of Date // ~*~ //

  // ~*~ // Table // ~*~ //
  const tableHeaderItems = [
    {
      name: "No",
      className: "w-12",
    },
    {
      name: "Nama Laporan",
      className: "",
    },
    {
      name: "Periode",
      className: "",
    },
    {
      name: "Aksi",
      className: "w-20 text-center",
    },
  ];

  const tableBodyItems = [
    {
      no: 1,
      name: "Laporan Bulan Januari",
      period: "April 2024",
    },
  ];

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Neraca Lajur",
      href: "/ledger",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  return (
    <>
      <DefaultLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Neraca Lajur</h1>

        <Breadcrumb items={breadcrumbItems} />

        <div className="mx-6">
          <div className="mt-4 bg-gray-200 py-8 rounded-md shadow-md px-8">
            <h1 className="text-3xl font-medium text-gray-600">Neraca Lajur</h1>

            <div className="flex gap-8 mx-20 mt-4">
              <div>
                <p>Nama Neraca Lajur</p>
                <Input placeholder="Nama Neraca Lajur" />
              </div>
              <div>
                <p className="pl-4">Tanggal</p>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="faded"
                      endContent={<ChevronDownIcon className="w-5 h-5" />}
                    >
                      Periode
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    {dropdownItem.map((item, index) => (
                      <DropdownItem key={index}>{item.label}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <Button color="primary" className="justify-self-end flex me-20">
              Simpan
            </Button>

            <div className="mt-8">
              <Table>
                <TableHeader>
                  {tableHeaderItems.map((item, index) => (
                    <TableColumn key={index} className={item.className}>
                      {item.name}
                    </TableColumn>
                  ))}
                </TableHeader>
                <TableBody>
                  {tableBodyItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.no}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.period}</TableCell>
                      <TableCell className="flex justify-center">
                        <DocumentArrowDownIcon className="w-5 h-5 text-primary" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
