import { DocumentArrowDownIcon } from "@heroicons/react/16/solid";
import {
  Modal,
  ModalContent,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { propsDetailLedger } from "@/core/interfaces/props";
import { useState } from "react";
import { periodeType } from "@/core/interfaces/data";
import { Urls } from "@/helpers/url";
import { ApiHelpers } from "@/helpers/api";

export default function DetailPeriodDialog({
  isOpen,
  onOpen,
  onOpenChange,
  id,
  description,
  periode,
}: propsDetailLedger) {
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
    // {
    //   name: "Aksi",
    //   className: "w-40",
    // },
  ];

  const [data, setData] = useState<periodeType>();

  const handleDetail = (id: number) => {
    const finalUrl = `${Urls.journalLedger}-report/${id}`;
    ApiHelpers.get({
      url: finalUrl,
      successCallback: (response) => {
        setData(response.data.data);
      },
      errorCallback: () => {},
    });
  };

  return (
    <>
      <DocumentArrowDownIcon
        className="text-primary w-6 h-6"
        onClick={async () => {
          await handleDetail(id);
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          <div className="mt-4">
            (
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
                <TableRow className="bg-gray-50">
                  <TableCell className="text-center">{data?.id || 0}</TableCell>
                  <TableCell className="text-center">
                    {data?.period || periode}
                  </TableCell>
                  <TableCell className="text-center">
                    {data?.description || description}
                  </TableCell>
                  {/* <TableCell className="text-center flex justify-evenly">
                    {renderModalComponent({ data: item })}
                    <TrashIcon className="text-danger w-6 h-6" />
                  </TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
            <Table aria-label="Periode Table" className={`mt-2 mb-8`}>
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
              <TableBody emptyContent="Data tidak ditemukan">
                {(data?.general_journal || []).map((item) => (
                  <TableRow key={item.id} className="bg-gray-50">
                    <TableCell className="text-center">{item.date}</TableCell>
                    <TableCell className="text-center">
                      {item.name_account}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.information}
                    </TableCell>
                    <TableCell className="text-center">{item.debit}</TableCell>
                    <TableCell className="text-center">{item.kredit}</TableCell>
                    {/* <TableCell className="text-center flex justify-evenly">
                      {renderModalComponent({ data: item })}
                      <TrashIcon className="text-danger w-6 h-6" />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
