import {
  CalendarDateRangeIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import DefaultLayout from "../layouts/default_layout";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";

export default function DashboardPage() {
  // const [stocks, setStocks] = useState<StuffProps[]>([]);
  // const [filteredStocks, setFilteredStocks] = useState<StuffProps[]>([]);
  // const [search, setSearch] = useState("");
  // const [date, setDate] = useState("");

  // const getStocks = () => {
  //   const role = localStorage.getItem("role");
  //   axios
  //     .get(
  //       `${getBaseUrl()}/${
  //         role === "supplier" ? "stock" : "stock_outlet"
  //       }/private/stuff`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       const data: StuffProps[] = res.data.data;
  //       setFilteredStocks(data);
  //       setStocks(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const checkToken = () => {
  //   const localToken = localStorage.getItem("token");
  //   if (localToken === null) {
  //     localStorage.clear();
  //     window.location.href = "/login";
  //   }
  // };

  // const handleTapSearch = () => {
  //   const filtered = stocks.filter((stock) => {
  //     return stock.name.toLowerCase().includes(search.toLowerCase());
  //   });
  //   setFilteredStocks(filtered);
  // };

  // const handleFilterDate = (
  //   date: string = new Date().toISOString().split("T")[0]
  // ) => {
  //   setDate(date);
  //   const filtered = stocks.filter((stock) => {
  //     return (
  //       stock.created_at && stock.created_at.toString().split("T")[0] === date
  //     );
  //   });
  //   setFilteredStocks(filtered);
  // };

  // const handleTapEdit = (id: number) => {
  //   window.location.href = `/stock/edit/${id}`;
  // };

  // const handleTapDelete = (id: number) => {
  //   Swal.fire({
  //     title: "Apakah Anda yakin?",
  //     text: "Data yang dihapus tidak dapat dikembalikan!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Ya, hapus!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteStock(id);
  //     }
  //   });
  // };

  // const deleteStock = (id: number) => {
  //   axios
  //     .delete(`${getBaseUrl()}/stock/private/stuff/${id}`)
  //     .then((res) => {
  //       Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
  //       getStocks();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       Swal.fire("Gagal!", "Data gagal dihapus.", "error");
  //     });
  // };

  // const resetFilteredStocks = () => {
  //   setFilteredStocks(stocks);
  // };

  // useEffect(() => {
  //   checkToken();
  //   getStocks();
  // }, []);

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
        <div className="px-6">
          <div className="flex items-center mt-6 bg-gray-200 p-4">
            <CalendarDateRangeIcon className="w-10 h-10" />
            <p className="ml-4 font-semibold text-lg">{dateNow}</p>
            {/* <Input
              type="date"
              className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                handleFilterDate(e.target.value);
              }}
            />
            <XMarkIcon
              className="w-14 h-14 text-white bg-c-c-dark-blue rounded-md p-2 ml-2 cursor-pointer bg-red-500"
              onClick={resetFilteredStocks}
            /> */}
          </div>
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            {/* <h3 className="text-3xl font-semibold text-gray-500">
              Stok Barang
            </h3> */}
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
                    <DropdownItem
                      key={index}
                      // onClick={() => console.log(item.label)}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              {/* <input
                type="search"
                className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cari barang"
                onChange={(e) => setSearch(e.target.value)}
              />
              <MagnifyingGlassIcon
                className="w-10 h-10 text-white bg-c-c-dark-blue rounded-md p-2 ml-2 cursor-pointer bg-blue-500"
                onClick={handleTapSearch}
              /> */}
            </div>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-2">ID Barang</th>
                  <th className="border-2 border-gray-300 p-2">Nama</th>
                  <th className="border-2 border-gray-300 p-2">Jenis</th>
                  <th className="border-2 border-gray-300 p-2">Jumlah</th>
                  <th className="border-2 border-gray-300 p-2">Satuan</th>
                  <th className="border-2 border-gray-300 p-2">Harga</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {[1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-2 border-gray-300 p-2">{item}</td>
                      <td className="border-2 border-gray-300 p-2">
                        Barang {item}
                      </td>
                      <td className="border-2 border-gray-300 p-2">Barang</td>
                      <td className="border-2 border-gray-300 p-2">10</td>
                      <td className="border-2 border-gray-300 p-2">pcs</td>
                      <td className="border-2 border-gray-300 p-2">Rp10.000</td>
                    </tr>
                  );
                })}

                {/* {filteredStocks.length === 0 && (
                  <tr>
                    <td colSpan={6} className="border-2 border-gray-300 p-2">
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
                {filteredStocks.map((stock) => (
                  <tr key={stock.id}>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.id_stuff}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.name}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.type}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.quantity}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.unit}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {stock.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
