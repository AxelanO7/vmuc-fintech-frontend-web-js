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
import DefaultLayout from "../../../layouts/default_layout";
import { generalJournalType } from "../../../core/interfaces/data";
import { breadcrumsItem } from "../../../core/interfaces/props";
import Breadcrumb from "../../../components/breadcrumb";
import { useState } from "react";

export default function GeneralJournalPage() {
  const [tableItems, setTableItems] = useState<generalJournalType[]>([]);
  
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
      name: "Tanggal",
      className: "",
    },
    {
      name: "Ref Post",
      className: "",
    },
    {
      name: "Keterangan",
      className: "",
    },
    {
      name: "Debit",
      className: "",
    },
    {
      name: "Kredit",
      className: "",
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

  const handleAdd = () => {
    window.location.replace("/" + "add-general-journal");
  };

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Jurnal Umum</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Jurnal Umum</h1>

        <div className="flex justify-between mt-4">
          <Button
            className="w-max"
            color="primary"
            onPress={handleAdd}
            startContent={<PlusIcon className="w-5 h-5" />}
          >
            Jurnal Umum
          </Button>
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
                        {content.date}
                      </TableCell>
                      <TableCell className="text-center">
                        {content.ref_post.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {content.information}
                      </TableCell>
                      <TableCell className="text-center">
                        {content.debit}
                      </TableCell>
                      <TableCell className="text-center">
                        {content.credit}
                      </TableCell>
                      <TableCell className="text-center flex justify-evenly">
                        <TrashIcon className="text-danger w-6 h-6" />
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
