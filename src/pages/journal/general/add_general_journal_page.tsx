import {
  Button,
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
import {
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

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
        code: "001",
        name: "test",
        type: "test",
        id: 1,
      },
    },
  ]);

  const refPostItems: refPostType[] = [
    {
      code: "001",
      name: "test",
      type: "test",
      id: 1,
    },
    {
      code: "002",
      name: "test",
      type: "test",
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
      href: "add-general-journal",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold mx-6 pt-4">Jurnal Umum</h1>

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-gray-200 mt-4 mx-4 py-8 px-4">
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
                        placeholder="Pilih nama akun"
                        variant="bordered"
                        value={item.ref_post.name}
                        className="cursor-pointer"
                        onChange={(e) =>
                          setTableItems(
                            tableItems.map((tableItem) =>
                              tableItem.id === item.id
                                ? {
                                    ...tableItem,
                                    ref_post: {
                                      ...tableItem.ref_post,
                                      name: e.target.value,
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
                            value={refPostItem.name}
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
                    value={item.ref_post.code}
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
                credit: 0,
                debit: 0,
                information: "",
                id: tableItems.length + 1,
                date: "01-01-2021",
                ref_post: {
                  code: "001",
                  name: "test",
                  type: "test",
                  id: 1,
                },
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
            Rp. {tableItems.reduce((acc, item) => acc + item.debit, 0)}
          </p>
          <p className="w-1/3">
            Rp. {tableItems.reduce((acc, item) => acc + item.credit, 0)}
          </p>
        </div>
        <div className="flex w-1/2 mt-4 pl-12 font-medium">
          <p className="w-1/3">Selisih</p>
          <div className="w-1/3" />
          <p className="w-1/3">
            Rp.{" "}
            {tableItems.reduce((acc, item) => acc + item.debit, 0) -
              tableItems.reduce((acc, item) => acc + item.credit, 0)}
          </p>
        </div>
        <div className="w-full flex justify-end mt-4">
          <Button color="primary">Simpan</Button>
        </div>
      </div>
    </DefaultLayout>
  );
}
