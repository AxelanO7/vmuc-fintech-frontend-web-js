import {
  DocumentArrowDownIcon,
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
} from "@nextui-org/react";
import { breadcrumsItem } from "../../core/interfaces/props";
import Breadcrumb from "../../components/breadcrumb";
import { generalJournalType } from "../../core/interfaces/data";
import DefaultLayout from "../../layouts/default_layout";

export default function PeriodReportPage() {
  // ~*~ // Table // ~*~ //
  const tableItems: generalJournalType[] = [
    {
      id: 1,
      period: "Mei/2024",
      description: "Laporan Mei",
      contents: [
        {
          id: 1,
          date: "01/05/2024",
          ref_post: {
            id: 1,
            name: "test",
            code: "001",
            type: "test",
          },
          information: "Laporan Neraca Lajur Bulan Mei",
          debit: 1000000,
          credit: 0,
        },
        {
          id: 2,
          date: "01/05/2024",
          ref_post: {
            id: 1,
            name: "test",
            code: "001",
            type: "test",
          },
          information: "Gaji Bulan Mei",
          debit: 0,
          credit: 1000000,
        },
      ],
    },
  ];

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
      name: "No",
      className: "w-20",
    },
    {
      name: "Nama Laporan",
      className: "text-start",
    },
    {
      name: "Aksi",
      className: "w-40",
    },
  ];

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Jurnal Umum",
      href: "general-journal",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Laporan Periode</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Laporan Periode</h1>

        <div className="flex justify-end mt-4">
          <div className="flex gap-2">
            <Input placeholder="Cari" type="search" />
            <Button color="primary" isIconOnly>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4">
          {tableItems.map((item, index) => (
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
                    <TableCell className="text-center">{item.period}</TableCell>
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
                <TableBody>
                  {item.contents.map((content) => (
                    <TableRow key={content.id} className="bg-gray-50">
                      <TableCell className="text-center">
                        {content.id}
                      </TableCell>
                      <TableCell>{content.information}</TableCell>
                      <TableCell className="text-center flex justify-evenly">
                        <DocumentArrowDownIcon className="w-6 h-6 text-primary" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}
