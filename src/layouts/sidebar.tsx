import { useRecoilValue } from "recoil";
import { sidebarState } from "../core/store";
import {
  BanknotesIcon,
  DocumentChartBarIcon,
  DocumentTextIcon,
  HomeIcon,
  PencilIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";

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

  return (
    <div className="h-screen fixed top-16 left-0 z-10 select-none bg-gray-800 text-white">
      <p
        className={`${
          sidebarOpen ? "text-2xl py-4" : "text-xl py-3"
        } font-bold text-center border-b-2 border-gray-700`}
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
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            onClick={() => handleSidebar("/report")}
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
            {sidebarOpen && <p className="ml-2">Karyawan</p>}
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
