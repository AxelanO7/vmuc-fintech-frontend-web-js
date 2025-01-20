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
import DefaultLayout from "../../../layouts/default_layout";
import { breadcrumsItem } from "../../../core/interfaces/props";
import Breadcrumb from "../../../components/breadcrumb";
import { useEffect, useState } from "react";
import {
  generalJournalType,
  periodeType,
  refPostType,
} from "../../../core/interfaces/data";
import {
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { ApiHelpers } from "../../../helpers/api";
import { Urls } from "../../../helpers/url";

export default function AddGeneralJournalPage() {
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [tableItems, setTableItems] = useState<generalJournalType[]>([]);
  const [refPostItems, setRefPostItems] = useState<refPostType[]>([]);

  // ~*~ // Table // ~*~ //

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

  // ~*~ // Functions // ~*~ //
  const getRefPosts = async () => {
    ApiHelpers.get({
      url: Urls.refPost,
      successCallback: (response) => {
        setRefPostItems(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  const handleSubmit = async () => {
    const dataPeriod: periodeType = {
      period: period,
      description: description,
      generalJournal: tableItems,
      payrolls: [],
      adjusmentEntries: [],
      trialBalance: [],
    };
    await createPeriod(dataPeriod);
    createGeneralJournals(dataPeriod);
  };

  const createPeriod = async (data: periodeType) => {
    ApiHelpers.post({
      url: Urls.periodGeneral,
      data: data,
      successCallback: () => {},
      errorCallback: () => {},
    });
  };

  const createGeneralJournals = async (data: periodeType) => {
    ApiHelpers.post({
      url: Urls.periodGeneral,
      data: data,
      successCallback: () => {},
      errorCallback: () => {},
    });
  };

  // ~*~ // End of Functions // ~*~ //

  useEffect(() => {
    getRefPosts();
  }, []);

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
              onChange={(e) => setPeriod(e.target.value)}
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
                        value={item.name_account}
                        className="cursor-pointer"
                        readOnly
                        endContent={<ChevronDownIcon className="w-5 h-5" />}
                      />
                    </DropdownTrigger>
                    <DropdownMenu>
                      {refPostItems.map((refPostItem) => (
                        <DropdownSection key={refPostItem.name}>
                          <DropdownItem
                            key={refPostItem.id}
                            onClick={() =>
                              setTableItems(
                                tableItems.map((tableItem) =>
                                  tableItem.id === item.id
                                    ? {
                                        ...tableItem,
                                        name_account: refPostItem.name,
                                        id_ref: refPostItem.id || 0,
                                      }
                                    : tableItem
                                )
                              )
                            }
                          >
                            {refPostItem.name}
                          </DropdownItem>
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
                    value={(item.ref?.code || 0).toString()}
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
                    defaultValue={item.kredit.toString()}
                    onChange={(e) =>
                      setTableItems(
                        tableItems.map((tableItem) =>
                          tableItem.id === item.id
                            ? {
                                ...tableItem,
                                kredit: parseInt(e.target.value),
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
                id: tableItems.length + 1,
                name_account: "",
                date: "",
                information: "",
                debit: 0,
                kredit: 0,
                id_ref: 0,
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
            Rp. {tableItems.reduce((acc, item) => acc + item.debit, 0)}
          </p>
          <p className="w-1/3">
            Rp. {tableItems.reduce((acc, item) => acc + item.kredit, 0)}
          </p>
        </div>
        <div className="flex w-1/2 mt-4 pl-12 font-medium">
          <p className="w-1/3">Selisih</p>
          <div className="w-1/3" />
          <p className="w-1/3">
            Rp.{" "}
            {tableItems.reduce((acc, item) => acc + item.debit, 0) -
              tableItems.reduce((acc, item) => acc + item.kredit, 0)}
          </p>
        </div>
        <div className="w-full flex justify-end mt-4">
          <Button color="primary" onClick={handleSubmit}>
            Simpan
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
}
