import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
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
import DefaultLayout from "@/layouts/default_layout";
import { breadcrumsItem } from "@/core/interfaces/props";
import Breadcrumb from "@/components/breadcrumb";
import { useEffect, useState } from "react";
import { trialBalanceType } from "@/core/interfaces/data";
import { ApiHelpers } from "@/helpers/api";
import { Urls } from "@/helpers/url";

export default function WorkSheetPage() {
  const [tableItems, setTableItems] = useState<trialBalanceType[]>([]);
  // ~*~ // Table // ~*~ //
  const tableHeaderItems = [
    {
      name: "No",
      className: "w-12",
    },
    {
      name: "Kode Akun",
      className: "",
    },
    {
      name: "Nama Akun",
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
  ];

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Neraca Lajur",
      href: "/work-sheet",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  // ~*~ // Functions // ~*~ //
  const getWorkSheets = () => {
    ApiHelpers.get({
      url: Urls.journalWorkSheet,
      successCallback: (response) => {
        setTableItems(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  // ~*~ // End of Functions // ~*~ //

  useEffect(() => {
    getWorkSheets();
  }, []);

  return (
    <>
      <DefaultLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Neraca Lajur</h1>

        <Breadcrumb items={breadcrumbItems} />

        <div className="bg-gray-200 m-4 p-8">
          <h1 className="text-3xl font-medium text-gray-600">Neraca Lajur</h1>

          <div
            className="flex justify-end
         mt-4"
          >
            <div className="flex gap-2">
              <Input placeholder="Cari" type="search" />
              <Button color="primary" isIconOnly>
                <MagnifyingGlassIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
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
              <TableBody emptyContent="Data tidak ditemukan">
                {tableItems.map((item, index) => (
                  <TableRow key={item.id} className="bg-gray-50">
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">
                      {item.ref?.code}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.name_account}
                    </TableCell>
                    <TableCell className="text-center">{item.debit}</TableCell>
                    <TableCell className="text-center">{item.kredit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
