import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import {
  Button,
  DatePicker,
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
import DefaultLayout from "../../layouts/default_layout";
import { useState, useEffect } from "react";

import { ApiHelpers } from "../../helpers/api";
import { Urls } from "../../helpers/url";
import { reportPeriodType } from "../../core/interfaces/data";

export default function PeriodReportPage() {
  const [tableItems, setTableItems] = useState<reportPeriodType>();

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
    // {
    //   name: "Aksi",
    //   className: "w-40",
    // },
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
    // {
    //   name: "Aksi",
    //   className: "w-40",
    // },
  ];

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Laporan Periode",
      href: "general-journal",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  // ~*~ // Functions // ~*~ //
  // const handleAdd = () => {
  //   window.location.replace("/" + "add-general-journal");
  // };

  // const getGeneralJournals = () => {
  //   ApiHelpers.get({
  //     url: Urls.periodGeneralJournal,
  //     successCallback: (response) => {
  //       setTableItems(response.data.data);
  //     },
  //     errorCallback: () => {},
  //   });
  // };

  // const deleteGeneralJournal = (id: number) => {
  //   ApiHelpers.delete({
  //     url: Urls.journalGeneral + "/" + id,
  //     successCallback: () => {
  //       Swal.fire("Berhasil", "Data berhasil dihapus", "success");
  //       getGeneralJournals();
  //     },
  //     errorCallback: () => {},
  //   });
  // };

  const getGeneralJournals = (
    date: string = new Date().toISOString().split("T")[0]
  ) => {
    const finalUrl = Urls.periodPrivate + `/get-report-trial-balance/${date}`;
    ApiHelpers.get({
      url: finalUrl,
      successCallback: (response) => {
        setTableItems(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  useEffect(() => {
    getGeneralJournals();
  }, []);

  // ~*~ // End of Functions // ~*~ //

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Laporan Periode</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Laporan Periode</h1>

        <div className="flex justify-between mt-4">
          <DatePicker
            className="w-max"
            onChange={(date) => {
              const dateValue = new Date(date.toString())
                .toISOString()
                .split("T")[0];
              getGeneralJournals(dateValue);
            }}
          />
          <div className="flex gap-2">
            <Input placeholder="Cari" type="search" />
            <Button color="primary" isIconOnly>
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4">
          {tableItems && (
            <div>
              <Table aria-label="Periode Table">
                <TableHeader>
                  {tableHeaderParentItems.map((item) => (
                    <TableColumn className={`text-center ${item.className}`}>
                      {item.name}
                    </TableColumn>
                  ))}
                </TableHeader>
                <TableBody emptyContent="Data tidak ditemukan">
                  <TableRow className="bg-gray-50">
                    <TableCell className="text-center">
                      {tableItems.period.id}
                    </TableCell>
                    <TableCell className="text-center">
                      {tableItems.period.period}
                    </TableCell>
                    <TableCell className="text-center">
                      {tableItems.period.description}
                    </TableCell>
                    {/* <TableCell className="text-center flex justify-evenly">
                      <DocumentArrowDownIcon className="text-primary w-6 h-6" />
                      <TrashIcon className="text-danger w-6 h-6" />
                    </TableCell> */}
                  </TableRow>
                </TableBody>
              </Table>
              <Table aria-label="Periode Table" className={`mt-2`}>
                <TableHeader>
                  {tableHeaderChildItems.map((item) => (
                    <TableColumn className={`text-center ${item.className}`}>
                      {item.name}
                    </TableColumn>
                  ))}
                </TableHeader>
                <TableBody emptyContent="Data tidak ditemukan">
                  {tableItems.trial_balance &&
                    tableItems.trial_balance.map((item) => (
                      <TableRow className="bg-gray-50">
                        {/* <TableCell className="text-center">
                            {item.date}
                          </TableCell> */}
                        <TableCell className="text-center">
                          {item.name_account}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.name_account}
                        </TableCell>
                        {/* <TableCell className="text-center">
                            {item.debit}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.kredit}
                          </TableCell> */}
                        {/* <TableCell className="text-center flex justify-evenly">
                          <DocumentArrowDownIcon className="w-6 h-6 text-primary" />
                        </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
