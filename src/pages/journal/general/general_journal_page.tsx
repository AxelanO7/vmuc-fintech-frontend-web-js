import {
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DefaultLayout from "@/layouts/default_layout";
import { generalJournalType, periodeType } from "@/core/interfaces/data";
import { breadcrumsItem } from "@/core/interfaces/props";
import Breadcrumb from "@/components/breadcrumb";
import { useEffect, useState } from "react";
import { ApiHelpers } from "@/helpers/api";
import { Urls } from "@/helpers/url";
import { Pencil, Trash } from "lucide-react";
import Swal from "sweetalert2";

export default function GeneralJournalPage() {
  const [tableItems, setTableItems] = useState<periodeType[]>([]);
  const [generalJournalTemp, setGeneralJournalTemp] = useState<periodeType>();

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

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Jurnal Umum",
      href: "general-journal",
    },
  ];

  // ~*~ // Functions // ~*~ //
  const handleAdd = () => {
    window.location.replace("/" + "add-general-journal");
  };

  const getGeneralJournals = () => {
    ApiHelpers.get({
      url: Urls.periodGeneralJournal,

      successCallback: (response) => {
        setTableItems(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  const handleEditGeneralJournal = () => {
    const generalJournals: generalJournalType[] =
      generalJournalTemp?.general_journal || [];

    ApiHelpers.put({
      url: `${Urls.journalGeneral}s`,
      data: generalJournals,
      successCallback: () => {
        Swal.fire({
          title: "Berhasil",
          text: "Data berhasil diubah",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          getGeneralJournals();
        });
      },
      errorCallback: () => {},
    });
  };

  const handleDeleteGeneralJournal = (id: number) => {
    ApiHelpers.delete({
      url: Urls.journalGeneral + "/" + id,
      successCallback: () => {
        Swal.fire({
          title: "Berhasil",
          text: "Data berhasil dihapus",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          getGeneralJournals();
        });
      },
      errorCallback: () => {},
    });
  };

  useEffect(() => {
    getGeneralJournals();
  }, []);

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
            <TableBody emptyContent="Data tidak ditemukan">
              {tableItems &&
                tableItems.map((item, index) => (
                  <TableRow key={item.id} className="bg-gray-50">
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{item.period}</TableCell>
                    <TableCell className="text-center">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-center flex justify-evenly">
                      <Dialog>
                        <DialogTrigger>
                          <DocumentArrowDownIcon
                            className="text-primary w-6 h-6"
                            onClick={() => setGeneralJournalTemp(item)}
                          />
                        </DialogTrigger>
                        <DialogContent className="max-w-[90%]">
                          <DialogHeader>
                            <DialogTitle>Periode</DialogTitle>
                            <DialogDescription>{item.period}</DialogDescription>
                          </DialogHeader>
                          <Table
                            aria-label="Jurnal Umum Table"
                            className="mt-2"
                          >
                            <TableHeader>
                              <TableColumn className="text-center">
                                Tanggal
                              </TableColumn>
                              <TableColumn className="text-center">
                                Ref Post
                              </TableColumn>
                              <TableColumn className="text-center">
                                Keterangan
                              </TableColumn>
                              <TableColumn className="text-center">
                                Debit
                              </TableColumn>
                              <TableColumn className="text-center">
                                Kredit
                              </TableColumn>
                              <TableColumn className="w-24 text-center">
                                Aksi
                              </TableColumn>
                            </TableHeader>
                            <TableBody emptyContent="Data tidak ditemukan">
                              {item.general_journal &&
                                item.general_journal.map((journal) => (
                                  <TableRow
                                    key={journal.id}
                                    className="bg-gray-50"
                                  >
                                    <TableCell>
                                      <Input
                                        className="text-center"
                                        defaultValue={journal.date}
                                        type="date"
                                        onChange={(e) => {
                                          const existingJournals: generalJournalType =
                                            journal;

                                          const updatedJournals: generalJournalType =
                                            {
                                              ...existingJournals,
                                              date: e.target.value,
                                            };

                                          const updatedGeneralJournalTemp: periodeType =
                                            generalJournalTemp as periodeType;

                                          const updatedGeneralJournals =
                                            updatedGeneralJournalTemp?.general_journal.map(
                                              (journal) =>
                                                journal.id ===
                                                  updatedJournals.id &&
                                                updatedJournals
                                            );

                                          setGeneralJournalTemp({
                                            ...updatedGeneralJournalTemp,
                                            general_journal:
                                              updatedGeneralJournals?.filter(
                                                (
                                                  journal
                                                ): journal is generalJournalType =>
                                                  journal !== false
                                              ),
                                          });
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      <Input
                                        className="text-center"
                                        defaultValue={journal.name_account}
                                        type="text"
                                        onChange={(e) => {
                                          const existingJournals: generalJournalType =
                                            journal;
                                          const updatedJournals: generalJournalType =
                                            {
                                              ...existingJournals,
                                              name_account: e.target.value,
                                            };
                                          const updatedGeneralJournalTemp: periodeType =
                                            generalJournalTemp as periodeType;
                                          const updatedGeneralJournals =
                                            updatedGeneralJournalTemp?.general_journal.map(
                                              (journal) =>
                                                journal.id ===
                                                  updatedJournals.id &&
                                                updatedJournals
                                            );
                                          setGeneralJournalTemp({
                                            ...updatedGeneralJournalTemp,
                                            general_journal:
                                              updatedGeneralJournals?.filter(
                                                (
                                                  journal
                                                ): journal is generalJournalType =>
                                                  journal !== false
                                              ),
                                          });
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      <Input
                                        className="text-center"
                                        defaultValue={journal.information}
                                        type="text"
                                        onChange={(e) => {
                                          const existingJournals: generalJournalType =
                                            journal;
                                          const updatedJournals: generalJournalType =
                                            {
                                              ...existingJournals,
                                              information: e.target.value,
                                            };
                                          const updatedGeneralJournalTemp: periodeType =
                                            generalJournalTemp as periodeType;
                                          const updatedGeneralJournals =
                                            updatedGeneralJournalTemp?.general_journal.map(
                                              (journal) =>
                                                journal.id ===
                                                  updatedJournals.id &&
                                                updatedJournals
                                            );
                                          setGeneralJournalTemp({
                                            ...updatedGeneralJournalTemp,
                                            general_journal:
                                              updatedGeneralJournals?.filter(
                                                (
                                                  journal
                                                ): journal is generalJournalType =>
                                                  journal !== false
                                              ),
                                          });
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      <Input
                                        className="text-center"
                                        defaultValue={journal.debit.toString()}
                                        type="number"
                                        onChange={(e) => {
                                          const existingJournals: generalJournalType =
                                            journal;
                                          const updatedJournals: generalJournalType =
                                            {
                                              ...existingJournals,
                                              debit: Number(e.target.value),
                                            };
                                          const updatedGeneralJournalTemp: periodeType =
                                            generalJournalTemp as periodeType;
                                          const updatedGeneralJournals =
                                            updatedGeneralJournalTemp?.general_journal.map(
                                              (journal) =>
                                                journal.id ===
                                                  updatedJournals.id &&
                                                updatedJournals
                                            );
                                          setGeneralJournalTemp({
                                            ...updatedGeneralJournalTemp,
                                            general_journal:
                                              updatedGeneralJournals?.filter(
                                                (
                                                  journal
                                                ): journal is generalJournalType =>
                                                  journal !== false
                                              ),
                                          });
                                        }}
                                      />
                                    </TableCell>

                                    <TableCell>
                                      <Input
                                        className="text-center"
                                        defaultValue={journal.kredit.toString()}
                                        type="number"
                                        onChange={(e) => {
                                          const existingJournals: generalJournalType =
                                            journal;
                                          const updatedJournals: generalJournalType =
                                            {
                                              ...existingJournals,
                                              kredit: Number(e.target.value),
                                            };
                                          const updatedGeneralJournalTemp: periodeType =
                                            generalJournalTemp as periodeType;
                                          const updatedGeneralJournals =
                                            updatedGeneralJournalTemp?.general_journal.map(
                                              (journal) =>
                                                journal.id ===
                                                  updatedJournals.id &&
                                                updatedJournals
                                            );
                                          setGeneralJournalTemp({
                                            ...updatedGeneralJournalTemp,
                                            general_journal:
                                              updatedGeneralJournals?.filter(
                                                (
                                                  journal
                                                ): journal is generalJournalType =>
                                                  journal !== false
                                              ),
                                          });
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell className="h-16 space-x-4 flex items-center justify-center">
                                      <Pencil
                                        onClick={handleEditGeneralJournal}
                                      />
                                      <Trash
                                        onClick={() =>
                                          handleDeleteGeneralJournal(
                                            journal.id || 0
                                          )
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DefaultLayout>
  );
}
