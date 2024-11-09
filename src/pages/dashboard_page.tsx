import {
  CalendarDateRangeIcon,
  DocumentArrowDownIcon,
  HomeIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import DefaultLayout from "../layouts/default_layout";
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
} from "@nextui-org/react";

export default function DashboardPage() {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

  return (
    <>
      <DefaultLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Dashboard</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Dashboard</p>
        </div>
        <div className="mx-6">
          <div className="flex items-center mt-6 bg-gray-200 p-4">
            <CalendarDateRangeIcon className="w-10 h-10" />
            <p className="ml-4 font-semibold text-lg">{dateNow}</p>
          </div>
          <div className="mt-4 bg-gray-200 py-8 rounded-md shadow-md px-8">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <Input type="date" />
                <Button className="w-full" color="primary">
                  <PlusIcon className="w-5 h-5" />
                  Tambah Periode
                </Button>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">Periode</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {dropdownItem.map((item, index) => (
                    <DropdownItem key={index}>{item.label}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <Table aria-label="Periode Table" className="mt-8">
              <TableHeader>
                <TableColumn className="w-12 text-center">#</TableColumn>
                <TableColumn>Periode</TableColumn>
                <TableColumn className="w-40 text-center">Aksi</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1" className="bg-gray-50">
                  <TableCell>1</TableCell>
                  <TableCell>Mei 2024</TableCell>
                  <TableCell className="text-center flex justify-evenly">
                    <DocumentArrowDownIcon className="text-secondary w-10 h-10" />
                    <TrashIcon className="text-danger w-10 h-10" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table aria-label="Periode Table" className="mt-8">
              <TableHeader>
                <TableColumn>Periode</TableColumn>
                <TableColumn>Deskripsi</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1" className="bg-gray-50">
                  <TableCell>Mei 2024</TableCell>
                  <TableCell>Jurnal Umum</TableCell>
                  <TableCell>Done</TableCell>
                </TableRow>

                <TableRow key="2">
                  <TableCell>Mei 2024</TableCell>
                  <TableCell>Buku Besar</TableCell>
                  <TableCell>Done</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
