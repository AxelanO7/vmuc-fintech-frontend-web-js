import {
  Dropdown,
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
import DefaultLayout from "../../../layouts/default_layout";
import { breadcrumsItem } from "../../../core/interfaces/props";
import Breadcrumb from "../../../components/breadcrumb";
import { useState } from "react";
import {
  generalJournalContentType,
  refPostType,
} from "../../../core/interfaces/data";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/16/solid";

export default function AddGeneralJournalPage() {
  const [, setPeriode] = useState("");
  const [, setDescription] = useState("");

  // ~*~ // Table // ~*~ //
  const [tableItems, setTableItems] = useState<generalJournalContentType[]>([
    {
      credit: 0,
      debit: 0,
      information: "",
      id: 1,
      date: "01-01-2021",
      ref_post: {
        accountCode: "001",
        accountName: "test",
        accountType: "test",
        id: 1,
      },
    },
  ]);

  const refPostItems: refPostType[] = [
    {
      accountCode: "001",
      accountName: "test",
      accountType: "test",
      id: 1,
    },
    {
      accountCode: "002",
      accountName: "test",
      accountType: "test",
      id: 2,
    },
  ];

  const tableHeaderItems = [
    {
      name: "Nama Akun",
      className: "",
    },
    {
      name: "Tanggal",
      className: "",
    },
    {
      name: "Ref Post",
      className: "w-20",
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
      className: "w-20",
    },
  ];

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Jurnal Umum",
      href: "general-journal",
    },
    {
      label: "Tambah Jurnal Umum",
      href: "general-journal/add",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Jurnal Umum</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 m-4 p-8">
        <h1 className="text-3xl font-medium text-gray-600">Jurnal Umum</h1>

        <div className="flex mt-8 gap-4 ml-8">
          <div>
            <p className="ml-2 font-normal">Periode</p>
            <Input
              type="date"
              className="w-max"
              onChange={(e) => setPeriode(e.target.value)}
            />
          </div>
          <div>
            <p className="ml-2 font-normal">Deskripsi</p>
            <Input
              className="w-96"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <Table aria-label="Periode Table" className="mt-4">
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
                        placeholder="Pilih nama akun"
                        variant="bordered"
                        value={item.ref_post.accountName}
                        className="cursor-pointer"
                        onChange={(e) =>
                          setTableItems(
                            tableItems.map((tableItem) =>
                              tableItem.id === item.id
                                ? {
                                    ...tableItem,
                                    ref_post: {
                                      ...tableItem.ref_post,
                                      accountName: e.target.value,
                                    },
                                  }
                                : tableItem
                            )
                          )
                        }
                        readOnly
                        endContent={<ChevronDownIcon className="w-5 h-5" />}
                      />
                    </DropdownTrigger>
                    <DropdownMenu>
                      {refPostItems.map((refPostItem) => (
                        <DropdownSection key={refPostItem.id}>
                          <Input
                            label="Nama Akun"
                            placeholder="Pilih nama akun"
                            variant="bordered"
                            value={refPostItem.accountName}
                            className="cursor-pointer"
                            readOnly
                          />
                        </DropdownSection>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="date"
                    placeholder="Tanggal"
                    defaultValue={item.date}
                    onChange={(e) =>
                      setTableItems(
                        tableItems.map((tableItem) =>
                          tableItem.id === item.id
                            ? {
                                ...tableItem,
                                date: e.target.value,
                              }
                            : tableItem
                        )
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    placeholder="Ref Post"
                    value={item.ref_post.accountCode}
                    readOnly
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    placeholder="Keterangan"
                    defaultValue={item.information}
                    onChange={(e) =>
                      setTableItems(
                        tableItems.map((tableItem) =>
                          tableItem.id === item.id
                            ? {
                                ...tableItem,
                                information: e.target.value,
                              }
                            : tableItem
                        )
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    placeholder="Debit"
                    defaultValue={item.debit.toString()}
                    onChange={(e) =>
                      setTableItems(
                        tableItems.map((tableItem) =>
                          tableItem.id === item.id
                            ? {
                                ...tableItem,
                                debit: parseInt(e.target.value),
                              }
                            : tableItem
                        )
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    placeholder="Kredit"
                    defaultValue={item.credit.toString()}
                    onChange={(e) =>
                      setTableItems(
                        tableItems.map((tableItem) =>
                          tableItem.id === item.id
                            ? {
                                ...tableItem,
                                credit: parseInt(e.target.value),
                              }
                            : tableItem
                        )
                      )
                    }
                  />
                </TableCell>
                <TableCell className="text-center flex justify-evenly">
                  <TrashIcon className="text-danger w-6 h-6" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DefaultLayout>
  );
}
