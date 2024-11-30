import {
  CalendarDateRangeIcon,
  ChevronDownIcon,
  DocumentArrowDownIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import DefaultLayout from "../layouts/default_layout";
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
import Breadcrumb from "../components/breadcrumb";
import { breadcrumsItem } from "../core/interfaces/props";
import { dashboardType } from "../core/interfaces/data";

export default function DashboardPage() {
  // ~*~ // Date // ~*~ //
  const dateNow = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
  const tableHeaderParentItems = [
    {
      name: "#",
      className: "w-12",
    },
    {
      name: "Periode",
    },
    {
      name: "Aksi",
      className: "w-40",
    },
  ];

  const tableHeaderChildItems = [
    {
      name: "Periode",
    },
    {
      name: "Deskripsi",
    },
    {
      name: "Status",
    },

    {
      name: "Aksi",
      className: "w-40",
    },
  ];

  const tableItems: dashboardType[] = [
    {
      dateContents: [
        {
          id: 1,
          date: "Mei 2024",
          contents: [
            {
              id: 1,
              period: "Mei 2024",
              description: "Jurnal Umum",
              status: "Done",
            },
            {
              id: 2,
              period: "Mei 2024",
              description: "Buku Besar",
              status: "Done",
            },
          ],
        },
      ],
    },
  ];

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Dashboard",
      href: "#",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  return (
    <>
      <DefaultLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Dashboard</h1>

        <Breadcrumb items={breadcrumbItems} />

        <div className="mx-6">
          <div className="flex items-center mt-6 bg-gray-200 p-4">
            <CalendarDateRangeIcon className="w-10 h-10" />
            <p className="ml-4 font-semibold text-lg">{dateNow}</p>
          </div>

          <div className="mt-4 bg-gray-200 py-8 rounded-md shadow-md px-8">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <Input type="date" />
                <Button
                  className="w-full"
                  color="primary"
                  startContent={<PlusIcon className="w-5 h-5" />}
                >
                  Tambah Periode
                </Button>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="bordered"
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

            <div className="mt-4">
              {tableItems.map((item, index) => (
                <div key={item.dateContents[0].id}>
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
                      <TableRow
                        key={item.dateContents[0].id}
                        className="bg-gray-50"
                      >
                        <TableCell className="text-center">
                          {item.dateContents[0].id}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.dateContents[0].date}
                        </TableCell>
                        <TableCell className="text-center flex justify-evenly">
                          <DocumentArrowDownIcon className="text-secondary w-8 h-8" />
                          <TrashIcon className="text-danger w-8 h-8" />
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
                    <TableBody>
                      {item.dateContents[0].contents.map((content) => (
                        <TableRow key={content.id} className="bg-gray-50">
                          <TableCell className="text-center">
                            {content.period}
                          </TableCell>
                          <TableCell className="text-center">
                            {content.description}
                          </TableCell>
                          <TableCell className="text-center">
                            {content.status}
                          </TableCell>
                          <TableCell className="text-center flex justify-evenly">
                            <DocumentArrowDownIcon className="text-secondary w-8 h-8" />
                            <TrashIcon className="text-danger w-8 h-8" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
