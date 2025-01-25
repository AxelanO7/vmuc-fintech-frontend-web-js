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
  useDisclosure,
} from "@nextui-org/react";
import Breadcrumb from "../../../components/breadcrumb";
import { breadcrumsItem } from "../../../core/interfaces/props";
import DefaultLayout from "../../../layouts/default_layout";
import { useEffect, useState } from "react";
import { ApiHelpers } from "../../../helpers/api";
import { Urls } from "../../../helpers/url";
import { generalLedgerType, periodeType } from "../../../core/interfaces/data";
import DetailPeriodDialog from "./detail_period_dialog";

export default function LedgerPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tableItems, setTableItems] = useState<generalLedgerType[]>([]);

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

  // ~*~ // End of Table // ~*~ //

  // ~*~ // Breadcrumb // ~*~ //
  const breadcrumbItems: breadcrumsItem[] = [
    {
      label: "Buku Besar",
      href: "/ledger",
    },
  ];

  // ~*~ // End of Breadcrumb // ~*~ //

  // ~*~ // Modal // ~*~ //
  const renderModalComponent = () => {
    return (
      <DetailPeriodDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    );
  };

  // ~*~ // End of Modal // ~*~ //

  // ~*~ // Functions // ~*~ //
  const getGeneralLedgers = () => {
    ApiHelpers.get({
      url: Urls.generalLedgerEmployee,
      successCallback: (response) => {
        setTableItems(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  const getMonth = (month: string) => {
    switch (month) {
      case "Januari":
        return "01";
      case "Februari":
        return "02";
      case "Maret":
        return "03";
      case "April":
        return "04";
      case "Mei":
        return "05";
      case "Juni":
        return "06";
      case "Juli":
        return "07";
      case "Agustus":
        return "08";
      case "September":
        return "09";
      case "Oktober":
        return "10";
      case "November":
        return "11";
      case "Desember":
        return "12";
      default:
        return "01";
    }
  };

  const addGeneralLedger = () => {
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = getMonth(date);
    const day = dateNow.getDate();
    const finalDate = `${year}-${month}-${day}`;

    ApiHelpers.post({
      url: Urls.generalLedgerEmployee,
      data: {
        name_general_ledger: name,
        date: finalDate,
      },
      successCallback: () => {
        getGeneralLedgers();
      },
      errorCallback: () => {},
    });
  };

  const handleDetail = (id: number) => {
    const finalUrl = `${Urls.generalLedgerEmployee}-report/${id}`;
    ApiHelpers.get({
      url: finalUrl,
      successCallback: (response) => {},
      errorCallback: () => {},
    });
  };

  // ~*~ // End of Functions // ~*~ //

  useEffect(() => {
    getGeneralLedgers();
  }, []);

  return (
    <>
      <DefaultLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Bukur Besar</h1>

        <Breadcrumb items={breadcrumbItems} />

        <div className="mx-6">
          <div className="mt-4 bg-gray-200 py-8 rounded-md shadow-md px-8">
            <h1 className="text-3xl font-medium text-gray-600">Buku Besar</h1>

            <div className="flex gap-8 mx-20 mt-4">
              <div>
                <p>Nama Buku Besar</p>
                <Input
                  placeholder="Nama Buku Besar"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <p className="pl-4">Tanggal</p>
                <Dropdown>
                  <DropdownTrigger>
                    <Input
                      placeholder="Periode"
                      defaultValue="Pilih Periode"
                      value={date}
                      endContent={<ChevronDownIcon className="w-5 h-5" />}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    {dropdownItem.map((item, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => setDate(item.label)}
                      >
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <Button
              color="primary"
              className="justify-self-end flex me-20"
              onClick={addGeneralLedger}
            >
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
                <TableBody emptyContent={"Tidak ada data yang tersedia"}>
                  {tableItems &&
                    tableItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name_general_ledger}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="flex justify-center">
                          {/* <DocumentArrowDownIcon
                            className="w-5 h-5 text-primary"
                            onClick={() => item.id && handleDetail(item.id)}
                          /> */}
                          {renderModalComponent()}
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
