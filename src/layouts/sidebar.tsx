import { useRecoilValue } from "recoil";
import { sidebarState } from "../core/interfaces/state";
import {
  ArrowsUpDownIcon,
  BanknotesIcon,
  DocumentChartBarIcon,
  DocumentTextIcon,
  HomeIcon,
  PencilIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";

import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Sidebar() {
  const sidebarOpen = useRecoilValue(sidebarState);

  const handleSidebar = (route: string) => {
    window.location.href = route;
  };

  //   const [role, setRole] = useState("");

  //   useEffect(() => {
  //     const localRole = localStorage.getItem("role");
  //     setRole(localRole || "outlet");
  //   }),
  //     [];

  // const journalItems = [
  //   "Jurnal Umum",
  //   "Buku Besar",
  //   "Neraca Saldo",
  //   "Jurnal Penyesuaian",
  //   "Neraca Lajur",
  //   "Laba Rugi",
  // ];

  const journalItems = [
    {
      title: "Jurnal Umum",
      route: "/general-journal",
    },
    {
      title: "Buku Besar",
      route: "/ledger",
    },
    {
      title: "Neraca Saldo",
      route: "/trial-balance",
    },
    {
      title: "Jurnal Penyesuaian",
      route: "/adjustment-entry",
    },
    {
      title: "Neraca Lajur",
      route: "/journal",
    },
    {
      title: "Laba Rugi",
      route: "/journal",
    },
  ];

  return (
    <div className="h-screen fixed top-16 left-0 z-10 select-none bg-gray-800 text-white">
      <p
        className={`${
          sidebarOpen ? "text-2xl py-4" : "text-xl py-3"
        } font-bold text-center border-b-2 border-gray-700 h-[66px] flex justify-center items-center`}
        onClick={() => handleSidebar("/dashboard")}
      >
        {sidebarOpen ? "Main Menu" : "V"}
      </p>
      <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
        <div
          className={`${
            sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
          } flex items-center h-16`}
          onClick={() => handleSidebar("/dashboard")}
        >
          <HomeIcon className="h-6 w-6" />
          {sidebarOpen && <p className="ml-2">Dashboard</p>}
        </div>
      </div>
      <div>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            onClick={() => handleSidebar("/ref")}
          >
            <PencilIcon className="h-6 w-6 " />
            {sidebarOpen && <p className="ml-2">Ref Post</p>}
          </div>
        </div>

        <div className="cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          {sidebarOpen ? (
            // remove padding and margin
            <Accordion>
              <AccordionItem
                key="1"
                aria-label="Jurnal"
                title="Jurnal"
                startContent={<DocumentTextIcon />}
                indicator={<ArrowsUpDownIcon />}
                // className="bg-yellow-400 p-0 m-0 w-full flex flex-col"
                classNames={{
                  title: "text-white",
                  base: "border-b border-gray-700 hover:bg-gray-700 pl-6",
                  startContent: "text-white h-6 w-6",
                  indicator: "text-white h-5 w-5 me-4",
                  content: "pl-2",
                }}
              >
                {journalItems.map((item, index) => (
                  <div
                    key={index}
                    className="h-14 flex items-center w-full"
                    onClick={() => handleSidebar(item.route)}
                  >
                    {sidebarOpen && <p>{item.title}</p>}
                  </div>
                ))}
              </AccordionItem>
            </Accordion>
          ) : (
            <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
              <div
                className={`${
                  sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
                } flex items-center`}
                onClick={() => handleSidebar("/journal")}
              >
                <DocumentTextIcon className="h-6 w-6 " />
                {sidebarOpen && <p className="ml-2">Jurnal</p>}
              </div>
            </div>
          )}
        </div>

        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            // onClick={() => handleSidebar("/report")}
          >
            <DocumentChartBarIcon className="h-6 w-6" />
            {sidebarOpen && <p className="ml-2">Laporan</p>}
          </div>
        </div>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            onClick={() => handleSidebar("/employee")}
          >
            <UsersIcon className="h-6 w-6" />
            {sidebarOpen && <p className="ml-2">Data Karyawan</p>}
          </div>
        </div>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            onClick={() => handleSidebar("/payroll")}
          >
            <BanknotesIcon className="h-6 w-6" />
            {sidebarOpen && <p className="ml-2">Gaji Karyawan</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
